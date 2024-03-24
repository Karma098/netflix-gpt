import React from 'react'
import { useSelector } from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
  const movies=useSelector((store)=>store.movies?.nowPlayingMovies);

  if(movies===null) return;

  const index=Math.floor(Math.random()*20);

  const mainMovie=movies[17];

  const {original_title, overview,id}=mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview}/>
      <VideoBackground movieid={id}/>
    </div>
  )
}

export default MainContainer;