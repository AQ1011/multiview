import { NextPage } from 'next'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import Header from '../components/Header/Header'
import Layout from '../components/Layout'
import VideoItem from '../components/VideoItem/VideoItem'
import styles from '../styles/Home.module.scss'
import { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {

  const [input, setInput] = useState('');
  const [list, setList] = useState([0]);
  const listElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      if(listElement.current){
        console.log(listElement.current);
        console.log(window.innerHeight, 
          listElement.current.scrollTop);
      }
    });
    let n = 0;
    let list = [];
    while (n < 25) {
      list.push(n);
      n++;
    }
    setList([...list]);
  }, [])
  const search = () => {
    if(input) {
      alert(input);
    }
  }
  return (
    <div>
      <div className={styles['video-list']} ref={listElement}>
        {list.map((n)=> <VideoItem key={n}></VideoItem>)}
      </div>
      
    </div>
  )
}

// Home.getLayout = function getLayout(page: ReactElement) {
//   return (
//     <Layout>
//       {page}
//     </Layout>
//   )
// }

export default Home
