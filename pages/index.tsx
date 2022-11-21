import { NextPage } from 'next'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import VideoItem from '../components/VideoItem/VideoItem'
import styles from '../styles/Home.module.scss'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [list, setList] = useState<number[]>([]);
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
    observer.current = new IntersectionObserver(([entry]) => setIsInViewPort(entry.isIntersecting));
    let n = 0;
    let list = [];
    while (n < 25) {
      list.push(n);
      n++;
    }
    setList([...list]);
  }, [])

  useEffect(() => {
    if(isInViewPort) {
      let n = list.length;
      let listTemp: number[] = [];
      while (n < list.length + 25) {
        listTemp.push(n);
        n++;
      }
      setList((list) => [...list, ...listTemp]);
      console.log(list);
    }
  }, [isInViewPort])

  return (
    <>
      <div className={styles['video-list']}>
        {list.map((n)=>
              <VideoItem key={n}></VideoItem>
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