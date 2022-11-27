import next, { NextPage } from 'next'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import VideoItem from '../components/VideoItem/videoItem'
import Item, { VideoSnippet } from '../models/item.interface'
import { YtResponse } from '../models/youtube.model'
import styles from '../styles/Home.module.scss'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [list, setList] = useState<Item<VideoSnippet>[]>([]);
  const loadElement = useRef<HTMLDivElement>(null);
  const [isInViewPort, setIsInViewPort] = useState(false);
  const [nextPageToken, setNextPageToken] = useState('');

  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (loadElement.current && observer.current)
      observer.current.observe(loadElement.current);

    return () => {
      if (observer.current)
        observer.current.disconnect();
    };
  }, [loadElement, observer]);

  function fetchPage(signal: AbortSignal,nextPage?: string) {
    try {
      fetch(`/api/home?` + new URLSearchParams({
        nextPageToken: nextPage ?? ''
      }), {signal}).then(res => {
        if (res.ok)
          return res.json();
      }).then((data: YtResponse<VideoSnippet>) => {
        setList([...list,...data.items]);
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
    const controller = new AbortController();
    fetchPage(controller.signal);
    observer.current = new IntersectionObserver(([entry]) => setIsInViewPort(entry.isIntersecting));
  }, [])

  useEffect(() => {
    if(isInViewPort) {
      const controller = new AbortController();
      fetchPage(controller.signal, nextPageToken);
      return () => controller.abort();
    }
  }, [isInViewPort])

  return (
    <>
      <div className={styles['video-list']}>
        {list.map((n)=>
        <div key={n.id as string}>
          <VideoItem {...n}></VideoItem>
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
    </>
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