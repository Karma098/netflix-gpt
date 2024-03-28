import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from '../components/MovieList';

const GptMovieSuggestions = () => {
  const {movieResults, movieNames}=useSelector((store)=>store?.gpt);

  if(!movieNames) return null;
  if(!movieResults) return null;
  return (
    <div className='py-4 my-4 bg-black bg-opacity-80 text-white'>
      <div>
        {movieNames?.map((movieName,index)=><MovieList key={movieName} title={movieName} movies={movieResults[index]} />)}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions;