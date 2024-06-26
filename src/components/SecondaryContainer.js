import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies=useSelector((store)=>store.movies);
  return movies.nowPlayingMovies &&(
    <div className=' bg-black'>
      <div className='-mt-24 md:-mt-56 pl-4 md:pl-12 relative z-10'>
        <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
        <MovieList title={"Trending"} movies={movies?.trendingMovies}/>
        <MovieList title={"Top Rated"} movies={movies?.topRatedMovies}/>
        <MovieList title={"Popular"} movies={movies?.popularMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies}/>
      </div>
      {/*
      MovieList - Popular
        -MovieCards * n
      MovieList - Now Playing
      MovieList - Trending
      MovieList - Horror
      */}
    </div>
  )
}

export default SecondaryContainer;