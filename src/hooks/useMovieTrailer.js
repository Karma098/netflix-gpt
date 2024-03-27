import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMovieTrailer=(movieid)=>{
  const dispatch=useDispatch();

  const navigate=useNavigate();

  const trailerVideo=useSelector(store=>store.movies.trailerVideo);

  const getMovieVideos=async ()=>{
    try{
      const data=await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`, API_OPTIONS);
  
      const json=await data.json();
      // console.log(json);
  
      const filterData=json?.results.filter(video=>video.type==="Trailer"&&video.name==="Official Trailer");
      const trailer=filterData.length?filterData[0]:json.results[0];
      // console.log(trailer);
      dispatch(addTrailerVideo(trailer));
    }catch(error){
      navigate("/error");
    }
  };

  useEffect(()=>{
    !trailerVideo&&getMovieVideos();
  },[]);
};

export default useMovieTrailer;