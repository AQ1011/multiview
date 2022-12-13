import { NextComponentType, NextPageContext } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Item, { VideoSnippet } from "../../models/item.interface";
import styles from './VideoItem.module.scss';

const VideoItem = ({id, snippet}: Item<VideoSnippet>) => {
    // let title = snippet.title;
    // if(title.length > 60) {
    //     title = title.substring(0, 80) + '...';
    // }
    return (
        <Link href={`/video/${id}`}>
            <div className={styles.container}>
                <div className={styles.thumbnail} data-live={snippet.liveBroadcastContent.localeCompare('live')}>
                    <Image src={snippet.thumbnails.medium.url} alt={snippet.title} 
                        objectFit="cover" layout="fill" placeholder="empty">
                    </Image>
                </div>
                <div className={styles.details}>
                    <div className={styles.title}>{snippet.title}</div>
                    <div className={styles.channel}>{snippet.channelTitle}</div>
                </div>
            </div>
        </Link>
    )
}

export default VideoItem;