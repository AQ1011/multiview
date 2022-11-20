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
                    <Link href='/video1'>
                        Menu 1
                    </Link>
                </li>
                <li>Menu 1</li>
                <li>Menu 1</li>
            </ul>
        </div>
    )
}
export default SideMenu