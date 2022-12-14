import { NextComponentType } from "next";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Item, { VideoSnippet } from "../../models/item.interface";
import { YtResponse } from "../../models/youtube.model";
import styles from './SideMenu.module.scss';

interface props {
    expand: boolean
}
interface MenuItem {
    name: string;
    icon: string;
    link: string;
}

const SideMenu: NextComponentType = (props) => {
    const { data: session, status } = useSession();
    const [subs, setSubs] = useState<Item<VideoSnippet>[]>([]);
    const route = useRouter();
    const items: MenuItem[] = [
        {
            name: 'Popular',
            icon: 'show_chart',
            link: '/'
        },
        {
            name: 'Multiview',
            icon: 'history',
            link: '/multiview'
        },
        {
            name: 'History',
            icon: 'history',
            link: '/history'
        },
        {
            name: 'Playlist',
            icon: 'list',
            link: '/playlist'
        }
    ]
    useEffect(() => {
        if  ( status === 'authenticated') {
            fetch('/api/user/subscriptions', {
                method: "POST",
                body: JSON.stringify({
                    accessToken: (session as any).access_token
                })
            }).then(res => res.json())
            .then((data: YtResponse<VideoSnippet>) => {
                console.log(data);
                setSubs([...data.items]);
            })
            .catch(() => {
                signOut();
            })
        }
    }, [status])
    return (
        <div className={styles.container}>
            <ul>
                {items.map((item, index) => {
                    return(
                        <li key={index} className={route.pathname === item.link ? styles.active : ''}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <Link href={item.link}>
                                {item.name}
                            </Link>
                        </li>
                    )
                })}
                {/* <li className={styles.active}>
                    <span className="material-symbols-outlined">show_chart</span>
                    <Link href='/'>
                       Popular
                    </Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">history</span>
                    <Link href='/multiview'>
                       Multiview
                    </Link>
                </li>
                <li>
                    <span className="material-symbols-outlined">history</span>
                    History
                </li>
                <li>
                    <span className="material-symbols-outlined">list</span>
                    Playlist
                </li> */}
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