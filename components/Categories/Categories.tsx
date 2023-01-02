import { useEffect, useRef, useState } from "react";
import Item, { CategorySnippet } from "../../models/item.interface";
import { YtResponse } from "../../models/youtube.model";
import styles from './Categories.module.scss';

export default function Categories({setCategory}: {setCategory: any}) {
    const [categoryList, setCategoryList] =  useState<Item<CategorySnippet>[]>([]);
    const list = useRef<HTMLUListElement>(null);
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    useEffect(() => {
        fetch('/api/categories').then((res) => {
            return res.json();
        }).then((data: YtResponse<CategorySnippet>)  => {
            setCategoryList(data.items);
        }).catch(err => console.log(err))
        list.current?.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - list.current!.offsetLeft;
            scrollLeft = list.current!.scrollLeft;
        });
        list.current?.addEventListener('mouseleave', () => {
            isDown = false;
        });
        list.current?.addEventListener('mouseup', () => {
            isDown = false;
        });
        list.current?.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - list.current!.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            list.current!.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    }, [])
    function pillClick(category: string) {
        setCategory(category)
    }
    return (
        <ul ref={list} className={styles.list}>
            <li key={0}>
                <button onClick={() => pillClick('')}>All</button>
            </li>
            {categoryList.map((category, index) => {
                return (
                    <li key={index} onClick={() => pillClick(category.snippet.title)}>
                        <button>{category.snippet.title}</button>
                    </li>
                )
            })}
        </ul>
    )
}