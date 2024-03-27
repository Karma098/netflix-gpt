import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMiniTrailerVideo } from "../utils/movieSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useMiniMovieTrailer=(movieid)=>{

  const navigate=useNavigate();

  const dispatch=useDispatch();

  const miniTrailerVideo=useSelector(store=>store.movies.miniTrailerVideo);

  const getMovieVideos=async ()=>{
    try{
      const data=await fetch(`https://api.themoviedb.org/3/movie/${movieid}/videos?language=en-US`, API_OPTIONS);
  
      const json=await data.json();
      // console.log(json);
  
      const filterData=json?.results?.filter(video=>video.type==="Trailer"&&video.name==="Official Trailer");
      const trailer=filterData?.length?filterData[0]:json.results[0];
      // console.log(trailer);
      dispatch(addMiniTrailerVideo(trailer));
    }catch(error){
      // console.log('There has been a problem with your fetch operation: ', error.message);
      navigate("/error");
    }
  };

  useEffect(()=>{
    !miniTrailerVideo&&getMovieVideos();
  },[]);
};

export default useMiniMovieTrailer;