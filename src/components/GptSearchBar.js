import React, { useRef, useState } from 'react'
import lang from '../utils/languageConstants'
import { useDispatch, useSelector } from 'react-redux'
import genAI, {safetySettings} from '../utils/genAI';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap-button-loader';

const GptSearchBar = () => {
  const currLang=useSelector((store)=>store.config.lang);
  const searchText=useRef(null);
  const dispatch=useDispatch();

  const [isLoading,setIsLoading]=useState(false);

  const movieResults=useSelector(store=>store.gpt.movieResults);

  const navigate=useNavigate();
  //search movie TMDB
  const searchMovieTMDB=async (movie)=>{
    try{
      const data=await fetch('https://api.themoviedb.org/3/search/movie?query='+movie+'&include_adult=false&language=en-US&page=1', API_OPTIONS);
  
      const json=await data.json();
  
      return json.results;
    }catch(error){
      // console.log(error);
      navigate("/error");
      <Error error={error}/>
    }

  }
  

  const handleGptSearchClick=async ()=>{
    // console.log(searchText.current.value);
    //Make an API call to GPT API and get Movie results
    try{
      setIsLoading(true);
      const genAiQuery="Act as a movie Recommendation system and suggest some movies for the query: "+searchText.current.value+". Only give me name of 5 movies, comma separated like the example result given- [Gadar,Sholay,Elemental,Don,La La Land,etc]";
    
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
      setIsLoading(false);
    }catch(error){
      navigate("/error");
      <Error error={error}/>
      // console.log(error);
    }

  }
  return (
    <div className='pt-[45%] md:pt-[9%] flex justify-center'>
      <form className='w-full md:w-1/2 bg-black bg-opacity-40 grid grid-cols-12 rounded-lg'
      onSubmit={(e)=>e.preventDefault()}
      >
        <input
        ref={searchText}
        type='text' className='col-span-10 p-3 m-4 rounded-md' placeholder={lang[currLang].gptSearchPlaceholder}/>
        {!isLoading?<button className='col-span-2 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:opacity-80 active:opacity-55'
        onClick={handleGptSearchClick}
        >{lang[currLang].search}</button>:
        <Button 
        className='col-span-2 m-4 py-2 px-4 bg-red-700 text-white rounded-lg hover:opacity-80 active:opacity-55' 
        loading={true}
        disabled={true}
        ></Button>}
      </form>
    </div>
  )
}

export default GptSearchBar