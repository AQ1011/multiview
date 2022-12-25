import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchPopUp.module.scss';
import { searchQueryAtom } from '../../store/store';
import Item, { VideoSnippet } from '../../models/item.interface';
import { YtResponse } from '../../models/youtube.model';
import VideoItem from '../VideoItem/videoItem';
import _ from 'lodash';

export default function SearchPopUp ({open, setOpen}: {open: boolean, setOpen: any}) {
    const backdrop = useRef(null);
    const [searchQuery] = useAtom(searchQueryAtom);
    const [videoList, setVideoList] = useState<Item<VideoSnippet>[]>([]);
    const searchDebounce = useCallback(
        _.debounce(() => {
            console.log(searchQuery);
            search(searchQuery);
        },500)
    , []);
    function closePopUp(e: any) {
        if(e.target !== backdrop.current) {
            return;
        }
        setOpen(false);
    }
    function search(query: string) {
        fetch('/api/search?' + new URLSearchParams({
            q: query
        })).then(res => res.json()).then((data: YtResponse<VideoSnippet>) => {
            setVideoList(data.items);
        }).catch(err => console.log(err));
    }
    useEffect(() => {
        // searchDebounce();
    },[searchQuery])

    function onEsc(e: any) {
        console.log(e.key);
        if(e.key === "Escape") {
            setOpen(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => onEsc(e))

        return window.removeEventListener('keydown', (e) => onEsc(e));
    }, [])

    if(!open) {
        return (
            <></>
        )
    }

    return (
        <div ref={backdrop} className={styles.backdrop} onClick={(e) => closePopUp(e)}>
            <div className={styles.container} onClick={(e) => e.preventDefault()}>
                {videoList.map((video) => {
                    return (
                        <div key={(video.id as any).videoId}>
                            <VideoItem {...video}>
                            </VideoItem>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}