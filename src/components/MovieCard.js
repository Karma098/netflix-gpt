import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMatchId, addPosterPath } from "../utils/configSlice";
import { useNavigate } from "react-router-dom";
import { addMiniTrailerVideo } from "../utils/movieSlice";

const MovieCard = ({ posterPath }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [enterTimeout, setEnterTimeout] = useState(null);
  const dispatch = useDispatch();

  const movieResults = useSelector((store) => store.gpt.movieResults);
  const navigate = useNavigate();

  const movies = useSelector((store) => store.movies);
  const matchedId = useSelector(
    (store) => store.config.miniTrailerInfo.matchId
  );

  const requiredPoster = useSelector(
    (store) => store.config.miniTrailerInfo.posterPath
  );
  const miniMovieTrailer = useSelector(
    (store) => store.movies.miniTrailerVideo
  );

  const getMovieVideos = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${matchedId}/videos?language=en-US`,
        API_OPTIONS
      );

      const json = await data.json();
      // console.log(json);

      const filterData = json?.results?.filter(
        (video) => video.type === "Trailer" && video.name === "Official Trailer"
      );
      const trailer = filterData?.length ? filterData[0] : json.results[0];
      // console.log(trailer);
      dispatch(addMiniTrailerVideo(trailer));
    } catch (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
      navigate("/error");
    }
  };

  useEffect(() => {
    const filteredMovieData = Object.fromEntries(
      Object.entries(movies).filter(
        ([key, value]) => key !== "trailerVideo" && key !== "miniTrailerVideo"
      )
    );

    if (movieResults !== null) {
      if (requiredPoster !== null) {
        for (const moviesArray of movieResults) {
          const matchedMovie = moviesArray.find(
            (movie) => movie?.poster_path === requiredPoster
          );
          if (matchedMovie) {
            dispatch(addMatchId(matchedMovie?.id));
            break;
          }
        }
      }
    }
    else{
      if (requiredPoster !== null) {
        for (const moviesArray of Object.values(filteredMovieData)) {
          const matchedMovie = moviesArray.find(
            (movie) => movie?.poster_path === requiredPoster
          );
          if (matchedMovie) {
            dispatch(addMatchId(matchedMovie?.id));
            break;
          }
        }
      }
    }

  }, [requiredPoster]);

  if (!posterPath) return null;

  const handleMouseEnter = () => {
    dispatch(addPosterPath(posterPath));
    setShowVideo(true);
    clearTimeout(enterTimeout);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowVideo(false);
    }, 50);
    setEnterTimeout(timeout);
  };

  return (
    <div className="w-36 md:w-44 pr-4 ">
      {!showVideo && (
        <img
          id="image"
          className="rounded-md cursor-pointer"
          alt="MovieCard"
          src={IMG_CDN + posterPath}
          onMouseEnter={handleMouseEnter}
        />
      )}
      {showVideo && getMovieVideos() && (
        <div
          className="relative z-10 w-48 h-44 md:w-80 md:h-80 rounded-lg overflow-hidden md:-ml-5 "
          id="youtube"
        >
          <iframe
            className="w-[100%] h-[100%] aspect-auto border-none"
            title="YouTube video player"
            src={
              "https://www.youtube.com/embed/" +
              miniMovieTrailer?.key +
              "?&autoplay=1&mute=0"
            }
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onMouseOut={handleMouseLeave}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
