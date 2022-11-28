import { NextComponentType } from "next";
import { useEffect, useRef, useState } from "react";
import Header from "./Header/Header";
import SideMenu from "./SideMenu/sideMenu";
import styles from './Layout.module.scss';

export default function Layout({ children }) {
    const headerHeight = '60px';
    const [expand, setExpand] = useState(true);
    // const page = useRef<HTMLDivElement>(null);
    const menu = () => {
        setExpand(() => !expand);
    }

    return (
        <div>
            <div className={styles.layout}>
                <div className={styles.header}>
                    <Header menu={menu} height={headerHeight}></Header>
                </div>
                <div className={styles.side} data-expand={expand} data-top={headerHeight} style={{overflowY: 'scroll'}}>
                    <SideMenu></SideMenu>
                </div>
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    )
}