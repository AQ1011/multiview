import dynamic from 'next/dynamic';
import { useState } from 'react'
import SearchPopUp from '../SearchPopUp/searchPopUp'
import styles from './SmallPlayer.module.scss'

interface props {
    videoId?: string;
    click: any;
    playerId: string;
}
const SmallPlayer = ({videoId, click, playerId}: props) => {
    const Player = dynamic(() => import('../Player/Player'), {
        ssr: false, 
    })

    if(!videoId)
    {
        return (
            <>
                <div className={styles.blank} onClick={click}>
                </div>
            </>
        )
    }
    return (
        <Player videoId={videoId} playerId={playerId}></Player>
        // <>
        // {videoId}
        // </>
    )
}
export default SmallPlayer;