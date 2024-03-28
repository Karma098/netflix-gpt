import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
  const movies=useSelector((store)=>store.movies?.nowPlayingMovies);
  const [index,setIndex]=useState(0);

  
  useEffect(()=>{
    setIndex(Math.floor(Math.random()*19));
  },[]);
  
  if(movies===null) return;

  // console.log(index);

  const mainMovie=movies[index];

  const {original_title, overview,id}=mainMovie;

  return (
    <div className='pt-[30%] bg-black md:pt-0'>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieid={id}/>
    </div>
  )
}

export default MainContainer;