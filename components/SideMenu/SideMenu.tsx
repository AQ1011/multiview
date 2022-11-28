import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Item, { VideoSnippet } from "../../models/item.interface";
import { YtResponse } from "../../models/youtube.model";
import styles from './SideMenu.module.scss';

interface props {
    expand: boolean
}
const SideMenu: NextComponentType = (props) => {
    const { data: session, status } = useSession();
    const [subs, setSubs] = useState<Item<VideoSnippet>[]>([]);

    useEffect(() => {
        if  ( status === 'authenticated') {
            fetch('/api/user/subscriptions', {
                method: "POST",
                body: JSON.stringify({
                    accessToken: (session as any).access_token
                })
            }).then(res => res.json())
            .then((data: YtResponse<VideoSnippet>) => {
                setSubs([...data.items]);
            })
        }
    }, [status])
    return (
        <div className={styles.container}>
            <ul>
                <li className={styles.active}>
                    <span className="material-symbols-outlined">show_chart</span>
                    <Link href='/'>
                       Popular
                    </Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">history</span>
                    History
                </li>
                <li>
                    <span className="material-symbols-outlined">list</span>
                    Playlist
                </li>
            </ul>
            <hr/>
            <ul>
                <div style={{paddingRight: '10px'}}>Subscriptions</div>
                {
                    subs.map(sub => {
                        return (
                            <li key={sub.id as string}>
                                <div>
                                    {sub.snippet.title}
                                </div>
                            </li>
                        )
                    })
                }
                
            </ul>
        </div>
    )
}
export default SideMenu