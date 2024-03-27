import {  useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';


const VideoBackground = ({movieid}) => {

  const isMute=useSelector((store)=>store.config.mute);

  const  trailerVideo=useSelector((store)=>store?.movies?.trailerVideo);

  useMovieTrailer(movieid);

  return (
    <div >
      <iframe 
        className='w-screen aspect-video'
        src={"https://www.youtube.com/embed/"+trailerVideo?.key+"?&autoplay=1&mute="+isMute}
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" 
      ></iframe>
    </div>
  )
}

export default VideoBackground