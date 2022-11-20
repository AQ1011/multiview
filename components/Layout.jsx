import { NextComponentType } from "next";
import { useState } from "react";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/SideMenu";
import styles from './Layout.module.scss';

export default function Layout({ children }) {
    const headerHeight = '60px';
    const [expand, setExpand] = useState(true);
    const menu = () => {
        setExpand(() => !expand);
    }
    return (
        <div>
            <div className={styles.layout}>
                <div className={styles.header}>
                    <Header menu={menu} height={headerHeight}></Header>
                </div>
                <div className={styles.side} data-expand={expand} data-top={headerHeight}>
                    <SideMenu></SideMenu>
                </div>
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    )
}