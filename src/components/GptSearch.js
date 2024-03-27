import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
      <div className='fixed -z-10'>
        <img 
        className='h-screen object-cover md:h-fit'
        alt="bg" src={BG_IMG}/>
      </div>
      <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions/>
        {/* Gpt Search bar
        GptMovieSuggestion */}
      </div>
    </>
  )
}

export default GptSearch;