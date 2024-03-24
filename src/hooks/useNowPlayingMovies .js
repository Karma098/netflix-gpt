import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { API_OPTIONS, FETCH_MOVIE_API } from "../utils/constants";

const useNowPlayingMovies=()=>{
  const dispatch=useDispatch();

  const getNowPlayingMovies=async ()=>{
    const data=await fetch(`${FETCH_MOVIE_API}now_playing?page=2`, API_OPTIONS);
    const json=await data.json();
    // console.log(json?.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  useEffect(()=>{
    getNowPlayingMovies();
  },[]);
};

export default useNowPlayingMovies;