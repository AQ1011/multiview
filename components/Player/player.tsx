import { throttle } from "lodash";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { YouTubePlayer } from "youtube-player/dist/types";
import styles from './Player.module.scss'

declare global {
    interface Window {
        YT?: {
            Player: any;
        }
        onYouTubeIframeAPIReady: any;
    }
}

export default function Player({videoId}: {videoId: string}) {
    const [size, setSize] = useState({width: 640, height: 390});
    const player = useRef<YouTubePlayer>();
    const container = useRef<HTMLDivElement>(null);


    function onPlayerReady(event: YoutubePlayerEvent) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event: YoutubePlayerEvent) {
        console.log(event);
    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            // console.log(container.current?.clientWidth, container.current?.clientHeight)
            // player.current?.setSize(
            //     container.current?.clientWidth!,
            //     container.current?.clientHeight!,
            // ).then();
        })
        // new ResizeObserver(throttle((entries) => {
        //     // player.current?.setSize(
        //     //     entries[0].target.clientWidth,
        //     //     entries[0].target.clientHeight
        //     // );
        //     console.log(entries[0].target.clientHeight)
        // },1000)).observe(container.current!);

        setSize(() => {
            return {width: container.current?.clientWidth!, height: container.current?.clientHeight!}
        });

        window.onYouTubeIframeAPIReady = () => {
            player.current = new window.YT!.Player('player', {
                width: '100%',
                height: '100%',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }

        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag!.parentNode!.insertBefore(tag, firstScriptTag);
    },[])
    return (
        <div className={styles['player-container']} ref={container}>
            <div id='player'>
                
            </div>
        </div>
    )
}

interface YoutubePlayerEvent {
    target: YouTubePlayer;
    data: number;
}