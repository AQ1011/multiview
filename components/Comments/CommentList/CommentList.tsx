import { useEffect, useState } from 'react';
import Item from '../../../models/item.interface';
import { YtResponse } from '../../../models/youtube.model';
import styles from './CommentList.module.scss';

export default function CommentList({videoId}: {videoId: string}) {
    const [threads, setThreads] = useState<Item<Comment>[]>([])
    useEffect(() => {
        // fetch('/api/commentThread?' + new URLSearchParams({
        //     videoId: videoId
        // })).then((res) => {
        //     if (res.ok)
        //         return res.json()
        // }).then((data: YtResponse<Comment>) => {
        //     console.log(data.items);
        //     setThreads([...data.items]);
        // })
    }, [])

    return (
        <div className={styles.container}>
            {threads.map((thread) => {
                return(
                    <div key=''></div>
                )
            })}
        </div>
    )
}