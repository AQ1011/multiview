import { useState } from 'react'
import SearchPopUp from '../SearchPopUp/searchPopUp'
import styles from './SmallPlayer.module.scss'

interface props {
    videoId?: string;
    click: any;
}
const SmallPlayer = ({videoId, click}: props) => {

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
        <></>
    )
}
export default SmallPlayer;