/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import dynamic from "next/dynamic";
import { useRouter } from "next/router"
import Script from "next/script";
import { useEffect, useMemo } from "react";
import { YouTubePlayer } from "youtube-player/dist/types";
import CommentList from "../../components/Comments/CommentList/commentList";

export default function Video() {
    const router = useRouter();
    const videoId = router.query['videoId'] as string;
    const Player = dynamic(() => import('../../components/Player/player'), {
        ssr: false, 
    })
    const CommentList = dynamic(() => import('../../components/Comments/CommentList/commentList'), {
        ssr: false,
    })

    return (
        <div style={{width: '100%', height: '100%', padding: '1em'}}>
            <Player videoId={videoId}></Player>
            {/* <Player videoId={videoId}></Player> */}
            {/* <CommentList videoId={videoId}></CommentList> */}
        </div>
    )
}