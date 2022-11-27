import { NextComponentType } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Link from "next/link";
import styles from './SideMenu.module.scss';

interface props {
    expand: boolean
}
const SideMenu: NextComponentType<BaseContext,{},props> = (props) => {
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
        </div>
    )
}
export default SideMenu