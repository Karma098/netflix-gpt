import { useState } from "react";
import { IMG_CDN } from "../utils/constants";
import useMiniMovieTrailer from "../hooks/useMiniMovieTrailer";
import { useSelector } from "react-redux";

const MovieCard = ({ posterPath,movieId }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [enterTimeout, setEnterTimeout] = useState(null);
  useMiniMovieTrailer(movieId);
  const miniMovieTrailer=useSelector((store)=>store.movies.miniTrailerVideo);
  // console.log(movieId);
  if (!posterPath) return null;
  // console.log(miniMovieTrailer[0]?.id===movieId);

  // const handleMouseEnter = () => {
  //   setTimeout(() => {
  //       setShowVideo(true);
  //   }, 500);
  // }

  const handleMouseEnter=()=> {
    // console.log('Mouse entered!');
    // Clear any pending enter timeout
    setShowVideo(true);
    clearTimeout(enterTimeout);
  }

  const handleMouseLeave=()=> {
    // console.log('Mouse left!');
    // Set a timeout to ensure onMouseEnter doesn't trigger if mouse leaves quickly
    const timeout = setTimeout(() => {
      // console.log('Cleared onMouseEnter');
      // Your onMouseEnter logic goes here
      setShowVideo(false);
    }, 50);
    setEnterTimeout(timeout);
  }

  return (


    <div className="w-44 pr-4 ">
      {!showVideo&&<img
        id="image"
        className="rounded-md cursor-pointer"
        alt="MovieCard"
        src={IMG_CDN + posterPath}
        onMouseEnter={handleMouseEnter}
      />}
      {showVideo && (
        <div className="relative z-10 w-80 h-80 rounded-lg overflow-hidden -ml-20 " id="youtube">
          <iframe
          className="w-[100%] h-[100%] aspect-auto border-none"
            title="YouTube video player"
            src={"https://www.youtube.com/embed/"+miniMovieTrailer[5]?.key+"?&autoplay=1&mute=0"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

            onMouseOut={handleMouseLeave}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
