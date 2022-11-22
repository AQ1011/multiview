/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import dynamic from "next/dynamic";
import { useRouter } from "next/router"
import Script from "next/script";
import { useEffect, useMemo } from "react";
import { YouTubePlayer } from "youtube-player/dist/types";

export default function Video() {
    const router = useRouter();
    const videoId = 'Zvb8xKmP-9U';
    const Player = dynamic(() => import('../../components/Player/player'), {
        ssr: false,
        loading: () => <p>...</p>, 
    })

    return (
        <div style={{width: '100%'}}>
            <Player videoId={videoId}></Player>
        </div>
    )
}