import React from 'react'
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_IMG } from '../utils/constants';

const GptSearch = () => {
  return (
    <div>
      <div className='fixed -z-10'>
        <img src={BG_IMG}/>
      </div>
      <GptSearchBar/>
      <GptMovieSuggestions/>
      {/* Gpt Search bar
      GptMovieSuggestion */}
    </div>
  )
}

export default GptSearch;