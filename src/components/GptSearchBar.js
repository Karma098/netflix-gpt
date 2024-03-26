import React, { useRef } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import genAI, {safetySettings} from '../utils/genAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const currLang=useSelector((store)=>store.config.lang);
  const searchText=useRef(null);
  const dispatch=useDispatch();

  //search movie TMDB
  const searchMovieTMDB=async (movie)=>{
    const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);

    const json=await data.json();

    return json.results;

  }
  

  const handleGptSearchClick=async ()=>{
    // console.log(searchText.current.value);
    //Make an API call to GPT API and get Movie results

    const genAiQuery="Act as a Movie Recommendation system and suggest some movies for the query: "+searchText.current.value+". Only give me name of  movies, comma separated like the example result given- [Gadar,Sholay,Elemental,Don,La La Land,etc]";
  
    const model = genAI.getGenerativeModel({ model: "gemini-pro",safety:safetySettings});
    const result = await model.generateContent(genAiQuery);
    const response = await result?.response;
    const text = response?.text();
    const genAiMovies=text.split(",");
    // console.log(genAiMovies);

    const promiseArray=genAiMovies.map((movie)=>searchMovieTMDB(movie));
    //[Promise1,P2,P3,P4,P5]

    const tmdbResults=await Promise.all(promiseArray);
    // console.log(tmdbResults);
    dispatch(addGptMovieResult({movieNames:genAiMovies,movieResults:tmdbResults}));
  }
  return (
    <div className='pt-[9%] flex justify-center'>
      <form className=' w-1/2 bg-black bg-opacity-40 grid grid-cols-12 rounded-lg'
      onSubmit={(e)=>e.preventDefault()}
      >
        <input
        ref={searchText}
        type='text' className='col-span-10 p-3 m-4 rounded-md' placeholder={lang[currLang].gptSearchPlaceholder}/>
        <button className='col-span-2 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:opacity-80 active:opacity-55'
        onClick={handleGptSearchClick}
        >{lang[currLang].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar