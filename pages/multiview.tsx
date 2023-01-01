import { useAtom } from "jotai";
import { useState } from "react";
import SearchPopUp from "../components/SearchPopUp/searchPopUp";
import SmallPlayer from "../components/SmallPlayer/smallPlayer";
import { multiViewVideoIdsAtom } from "../store/store";
import styles from '../styles/Multiview.module.scss';

export default function Multiview() {
    const [openSearch, setOpenSearch] = useState(false);
    const [clickedPlayer, setClickedPlayer] = useState<number>(0);
    const [multiViewVideoIds] = useAtom(multiViewVideoIdsAtom);

    function open(id: number) {
        setOpenSearch(true);
        setClickedPlayer(id);
    }
    
    return (
        <>
            <div className={styles.container}>
                <SmallPlayer click={() => open(0)} videoId={multiViewVideoIds[0]}></SmallPlayer>
                <SmallPlayer click={() => open(1)} videoId={multiViewVideoIds[1]}></SmallPlayer>
                <SmallPlayer click={() => open(2)} videoId={multiViewVideoIds[2]}></SmallPlayer>
                <SmallPlayer click={() => open(3)} videoId={multiViewVideoIds[3]}></SmallPlayer>
            </div>
            <SearchPopUp open={openSearch} setOpen={setOpenSearch} playerId={clickedPlayer}></SearchPopUp>
        </>
    )
}