import { throttle } from "lodash";
import { useRouter } from "next/router";
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
    const player = useRef<YouTubePlayer>();
    const container = useRef<HTMLDivElement>(null);
    const router = useRouter();

    function onPlayerReady(event: YoutubePlayerEvent) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event: YoutubePlayerEvent) {
        console.log(event);
    }
    useEffect(() => {
        console.log('run');
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
    },[]);

    useEffect(() => {
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
    }, [router, videoId])

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