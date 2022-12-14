import Image from "next/image";
import Link from "next/link";
import Item, { VideoSnippet } from "../../models/item.interface";
import styles from './VideoItem.module.scss';

interface Props extends Item<VideoSnippet> {
    noRedirect?: boolean,
    children?: any
}

export default function VideoItem ({id, snippet , noRedirect}: Props) {
    // let title = snippet.title;
    // if(title.length > 60) {
    //     title = title.substring(0, 80) + '...';
    // }
    console.log(noRedirect);
    let player = 
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

    if(!noRedirect)
        return (
            <Link href={`/video/${id}`}>
                {player}
            </Link>
    )
    else
    return(
        <>
            {player}
        </>
    )
}