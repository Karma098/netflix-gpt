import React from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
  const movies=useSelector((store)=>store.movies?.nowPlayingMovies);

  if(movies===null) return;

  const index=Math.floor(Math.random()*20);

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