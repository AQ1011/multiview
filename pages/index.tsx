import next, { NextPage } from 'next'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Categories from '../components/Categories/Categories'
import VideoItem from '../components/VideoItem/VideoItem'
import Item, { VideoSnippet } from '../models/item.interface'
import { YtResponse } from '../models/youtube.model'
import styles from '../styles/Home.module.scss'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [list, setList] = useState<Item<VideoSnippet>[]>([]);
  const loadElement = useRef<HTMLDivElement>(null);
  const [isInViewPort, setIsInViewPort] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');
  const [category, setCategory] = useState('');

  const observer = useRef<IntersectionObserver>();
  
  function fetchPage(signal: AbortSignal, nextPage?: string) {
    try {
      fetch(`/api/home?` + new URLSearchParams({
        nextPageToken: nextPage ?? ''
      }), {signal}).then(res => {
        if (res.ok)
          return res.json();
        }).then((data: YtResponse<VideoSnippet>) => {
          // setList([...list,...data.items]);
          setList(data.items);
          setNextPageToken(() => { 
            return data.nextPageToken;
          });
        }).catch();
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
    }
  }
  
  useEffect(() => {
    if (loadElement.current && observer.current)
      observer.current.observe(loadElement.current);

    // return () => {
    //   if (observer.current)
    //     observer.current.disconnect();
    // };
  }, [loadElement, observer]);
  useEffect(() => {
    console.log(category);
    if(category !== '')
      search(category);
    else {
      const controller = new AbortController();
      fetchPage(controller.signal, '');
    }
  }, [category])

  function search(query: string) {
    fetch('/api/search?' + new URLSearchParams({
        q: query
    })).then(res => res.json()).then((data: YtResponse<VideoSnippet>) => {
        setList(data.items);
    }).catch(err => console.log(err));
  }
  useEffect(() => {
      const controller = new AbortController();
      fetchPage(controller.signal, nextPageToken);
      observer.current = new IntersectionObserver(([entry]) =>{ 
        setIsInViewPort(entry.isIntersecting);
        console.log('checking');
      },{ 
        root: null, 
        rootMargin: '0px',
        threshold: 0.1
      });
      console.log(observer);
  }, [])

  useEffect(() => {
    if(isInViewPort) {
      const controller = new AbortController();
      fetchPage(controller.signal, nextPageToken);
      // return () => controller.abort();
    }
    console.log(isInViewPort);
  }, [isInViewPort])

  return (
    <div >
      <div style={{width: '100%', overflow: 'hidden'}}>
        <Categories setCategory={setCategory}></Categories>
      </div>
      <div className={styles['video-list']}>
        {list.map((n,index)=>
          <div key={index}>
            <VideoItem {...n} noRedirect={false}></VideoItem>
          </div>
        )}
      </div>
      <div ref={loadElement} className={styles['video-list']}>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>
    </div>
  )
}


export default Home

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <Layout>
//       {page}
//     </Layout>
//   )
// }

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.thumbnail}></div>
      <div className={styles.text}></div>
      <div className={styles.text} style={{width: '30%'}}></div>
    </div>
  )
}