import { NextComponentType } from "next";
import { BaseContext } from "next/dist/shared/lib/utils";
import Head from "next/head";
import styles from "./Header.module.scss";

const Header: NextComponentType<BaseContext, {}, {menu: () => void}> = ({menu}) => {
    return(
        <header className={styles.header}>
            <div className={styles.part}>
                <span className="material-symbols-outlined" 
                    style={{cursor: 'pointer', userSelect: 'none'}}
                    onClick={menu}>
                    menu
                </span>
                <span className={styles.logo}>HelloWorld</span>
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
            <button color="outline" data-shape='none'>
                <span className="material-symbols-rounded">
                  person
                </span>
            </button>
            {/* <button color="outline" data-shape='none'>
                <span className="material-symbols-rounded">
                  settings
                </span>
            </button> */}
            </div>
        </header>
    )
}

export default Header;

