import usePopularMovies from "../hooks/usePopularMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies ";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTrendingMovies from "../hooks/useTrendingMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";


const Browse=()=>{

  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();
  useTopRatedMovies();
  useTrendingMovies();

  return (
    <div>
      <Header/>
     {showGptSearch&& <GptSearch/>}
      {!showGptSearch&&
      <>
        <MainContainer/>
        <SecondaryContainer/>
      </>
      }
      {/*
          MainContainer
            -VideoBackGround
            -VideoTitle
          SecondaryContainer
            -MovieLists*n
            -cards * n
      */}
    </div>
  );
};

export default Browse;