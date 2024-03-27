import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS, FETCH_MOVIE_API } from "../utils/constants";

const useNowPlayingMovies=()=>{
  const dispatch=useDispatch();

  const nowPlayingMovies=useSelector(store=>store.movies.nowPlayingMovies);

  const getNowPlayingMovies=async ()=>{
    const data=await fetch(`${FETCH_MOVIE_API}now_playing?page=2`, API_OPTIONS);
    const json=await data.json();
    // console.log(json?.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(()=>{
    !nowPlayingMovies && getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;