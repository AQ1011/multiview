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

export default function Player({videoId, playerId}: {videoId: string, playerId?: string}) {
    const player = useRef<YouTubePlayer>();
    const container = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    const playerName = playerId || 'player';
    function onPlayerReady(event: YoutubePlayerEvent) {
        event.target.playVideo();
    }

    function onPlayerStateChange(event: YoutubePlayerEvent) {
        console.log(event);
    }
    useEffect(() => {
        setLoaded(false)
        window.onYouTubeIframeAPIReady = () => {
            player.current = new window.YT!.Player(playerName, {
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
        setLoaded(true);
    },[]);

    useEffect(() => {
        if(!loaded) return;
        try {
            player.current = new window.YT!.Player(playerName, {
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
        } catch (err) {

        }
    }, [router, videoId, loaded])

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