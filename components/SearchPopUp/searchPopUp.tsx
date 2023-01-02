import { useAtom } from 'jotai';
import { useAtomCallback } from 'jotai/utils'
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './SearchPopUp.module.scss';
import { multiViewVideoIdsAtom, searchQueryAtom } from '../../store/store';
import Item, { VideoSnippet } from '../../models/item.interface';
import { YtResponse } from '../../models/youtube.model';
import VideoItem from '../VideoItem/VideoItem';
import _ from 'lodash';

export default function SearchPopUp ({open, setOpen, playerId}: {open: boolean, setOpen: any, playerId: number}) {
    const backdrop = useRef(null);
    const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
    const [videoList, setVideoList] = useState<Item<VideoSnippet>[]>([]);
    const [multiViewVideoIds, setMultiViewVideoIds] = useAtom(multiViewVideoIdsAtom);


    const searchDebounce = useAtomCallback(
        useCallback((get) => {
                const query = get(searchQueryAtom);
                console.log(query);
                search(query);
        }, [])
    );
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

    // useEffect(() => {
    //     searchDebounce();
    // },[searchQuery])

    function onEsc(e: any) {
        if(e.key === "Escape") {
            setOpen(false);
        }
    }
    function onEnter(e: any) {
        if(e.key === "Enter") {
            console.log('normal', searchQuery)
            searchDebounce();
        }
    }
    
    function setVideoId(videoId: string) {
        console.log('current player', playerId);
        let temp = multiViewVideoIds.map((id, index) => (index === playerId) ? videoId : id)

        setMultiViewVideoIds(temp);
        setOpen(false);        
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => onEsc(e))
        window.addEventListener('keydown', (e) => onEnter(e))

        return () => {
            window.removeEventListener('keydown', (e) => onEnter(e))
            window.removeEventListener('keydown', (e) => onEsc(e));
        }
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
                        <div key={(video.id as any).videoId} onClick={() => setVideoId((video.id as any).videoId)}>
                            <VideoItem {...video} noRedirect={true}>
                            </VideoItem>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}