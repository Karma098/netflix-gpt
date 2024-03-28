import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const usePopularMovies=()=>{
  const dispatch=useDispatch();

  const navigate=useNavigate();

  const popularMovies=useSelector(store=>store.movies.popularMovies);

  const getPopularMovies=async ()=>{
    try{
      const data=await fetch("https://api.themoviedb.org/3/movie/popular?page=2", API_OPTIONS);
      const json=await data.json();
      // console.log(json?.results);
      dispatch(addPopularMovies(json.results));
    }catch(error){
      navigate("/error");
      // console.log('There has been a problem with your fetch operation: ', error.message);

    }
  };

  useEffect(()=>{
    !popularMovies&&getPopularMovies();
  },[]);
};

export default usePopularMovies;