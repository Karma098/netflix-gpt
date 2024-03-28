import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  addUpcomingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const useUpcomingMovies=()=>{
  const dispatch=useDispatch();

  const navigate=useNavigate();

  const upcomingMovies=useSelector(store=>store.movies.upcomingMovies);

  const getUpcomingMovies=async ()=>{
    try{
      const data=await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS);
      const json=await data.json();
      // console.log(json?.results);
      dispatch(addUpcomingMovies(json.results));
    }catch(error){
      navigate("/error");
      // console.log('There has been a problem with your fetch operation: ', error.message);

    }
  };

  useEffect(()=>{
    !upcomingMovies&&getUpcomingMovies();
  },[]);
};

export default useUpcomingMovies;