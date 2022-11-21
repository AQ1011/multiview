import { NextPage } from 'next'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import VideoItem from '../components/VideoItem/VideoItem'
import Video from '../models/videos.interface'
import { YtResponse } from '../models/youtube.model'
import styles from '../styles/Home.module.scss'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [list, setList] = useState<Video[]>([]);
  const loadElement = useRef<HTMLDivElement>(null);
  const [isInViewPort, setIsInViewPort] = useState(false);
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (loadElement.current && observer.current)
      observer.current.observe(loadElement.current);

    return () => {
      if (observer.current)
        observer.current.disconnect();
    };
  }, [loadElement, observer]);

  useEffect(() => {
    fetch('/api/home').then(res => {
      if (res.ok)
        return res.json();
    }).then((data: YtResponse) => {
      setList([...list,...data.items]);
    });
    setList([]);
    observer.current = new IntersectionObserver(([entry]) => setIsInViewPort(entry.isIntersecting));
  }, [])

  useEffect(() => {
    if(isInViewPort) {
      //get more yaya
    }
  }, [isInViewPort])

  return (
    <>
      <div className={styles['video-list']}>
        {list.map((n)=>
        <div key={n.id.videoId}>
          <VideoItem {...n}></VideoItem>
        </div>
        )}
      </div>
      <div ref={loadElement} className={styles.loader}></div>
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