import { useState } from "react";
import SearchPopUp from "../components/SearchPopUp/searchPopUp";
import SmallPlayer from "../components/SmallPlayer/smallPlayer";

export default function Multiview() {
    const [openSearch, setOpenSearch] = useState(false);

    function open() {
        setOpenSearch(true);
    }
    
    return (
        <div style={{width: '100%', height: '100%', display: 'flex', flexWrap: 'wrap'}}>
            <SmallPlayer click={open}></SmallPlayer>
            <SmallPlayer click={open}></SmallPlayer>
            <SmallPlayer click={open}></SmallPlayer>
            <SmallPlayer click={open}></SmallPlayer>
            <SearchPopUp open={openSearch} setOpen={setOpenSearch}></SearchPopUp>
        </div>
    )
}