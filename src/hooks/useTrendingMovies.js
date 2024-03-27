import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies} from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";

const useTrendingMovies=()=>{
  const dispatch=useDispatch();

  const trendingMovies=useSelector(store=>store.movies.trendingMovies);

  const getTrendingMovies=async ()=>{
    const data=await fetch("https://api.themoviedb.org/3/trending/movie/day?page=1", API_OPTIONS);
    const json=await data.json();
    // console.log(json?.results);
    dispatch(addTrendingMovies(json.results));
  };

  useEffect(()=>{
    !trendingMovies&&getTrendingMovies();
  },[]);
};

export default useTrendingMovies;