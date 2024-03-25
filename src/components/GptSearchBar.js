import React from 'react'
import lang from '../utils/languageConstants'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {
  const currLang=useSelector((store)=>store.config.lang);
  return (
    <div className='pt-[9%] flex justify-center'>
      <form className=' w-1/2 bg-black bg-opacity-40 grid grid-cols-12 rounded-lg'>
        <input type='text' className='col-span-10 p-3 m-4 rounded-md' placeholder={lang[currLang].gptSearchPlaceholder}/>
        <button className='col-span-2 m-4 py-2 px-4 bg-red-700 text-white rounded-lg'>{lang[currLang].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar