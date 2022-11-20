import { NextComponentType } from "next";
import Image from "next/image";
import styles from './VideoItem.module.scss';

const VideoItem: NextComponentType = () => {
    return (
        <div className={styles.container}>
            <div className={styles.thumbnail}>
                <Image src='' alt="thumbnail" objectFit="fill" placeholder="empty"></Image>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>Title</div>
                <div className={styles.channel}>Channel name</div>
            </div>
        </div>
    )
}

export default VideoItem;