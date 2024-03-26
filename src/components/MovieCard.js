import {IMG_CDN} from "../utils/constants";

const MovieCard = ({posterPath}) => {
  if(!posterPath) return null;
  return (
    <div className='w-44 pr-4 '>
      <img
      className='rounded-md'
      alt='MovieCard'
      src={IMG_CDN+posterPath}
      />
    </div>
  )
}

export default MovieCard;