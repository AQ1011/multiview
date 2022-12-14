import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import { signOut } from "next-auth/react"
import { atom, useAtom } from "jotai";
import { searchQueryAtom } from "../../store/store";
import { debounce } from "lodash";

const Header= ({menu} : {menu: any}) => {
    const { data: session, status } = useSession();
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
    function changeSearch(e: any) {
        console.log(searchQuery);
        setSearchQuery(e.target.value);
    }

    function triggerEnter(e: any) {
        var ev = new KeyboardEvent('keydown', {altKey:false,
            bubbles: true,
            cancelable: true,
            charCode: 0,
            code: "Enter",
            composed: true,
            ctrlKey: false,
            detail: 0,
            isComposing: false,
            key: "Enter",
            keyCode: 13,
            location: 0,
            metaKey: false,
            repeat: false,
            shiftKey: false,
            which: 13});
        window.dispatchEvent(ev);
    }
    return(
        <header className={styles.header}>
            <div className={styles.part}>
                <span className="material-symbols-outlined" 
                    style={{cursor: 'pointer', userSelect: 'none'}}
                    onClick={menu}>
                    menu
                </span>
                <span className={styles.logo}>Multi-Play-er</span>
            </div>
            <div className={styles.search}>
                <input onChange={(e) => changeSearch(e)}/>
                <button data-shape="icon" onClick={triggerEnter}>
                    <span className="material-symbols-outlined">
                        search
                    </span>
                </button>
            </div>
            <div className={`${styles.part} ${styles.hide}`}>
            {
                status === 'authenticated' && session
                ? 
                // <button color="outline" data-shape='none'>
                //     <Link href='/api/auth/signout'>
                //         <span className="material-symbols-rounded">
                //         logout
                //         </span>
                //     </Link>
                // </button> 
                <div className={styles['user-image']} onClick={() => signOut()}>
                    <Image src={session!.user?.image as string} alt={session!.user?.name as string}
                        layout='fill'>
                    </Image>
                </div>
                :
                <button color="outline" data-shape='none'>
                    <Link href='/api/auth/signin'>
                        <span className="material-symbols-rounded">
                        person
                        </span>
                    </Link>
                </button>
            }
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

