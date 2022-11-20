import { NextComponentType } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Head from "next/head";
import styles from "./Header.module.scss";

const Header: NextComponentType<BaseContext, {}, {menu: () => void}> = ({menu}) => {
    return(
        <header className={styles.header}>
            <div className={styles.part}>
                <span className="material-symbols-outlined" onClick={menu}>
                    menu
                </span>
                <span>HelloWorld</span>
            </div>
            <div className={styles.search}>
                <input/>
                <button data-shape="icon">
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
            </div>
            <div className={`${styles.part} ${styles.hide}`}>
            <button color="primary">
                Log in
            </button>
            <button color="outline">
                Settings
            </button>
            </div>
        </header>
    )
}

export default Header;

