import React from 'react'
import { GoUnmute, GoMute } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { changeMuteToUnmute, changeUnmuteToMute } from '../utils/configSlice';

const VideoTitle = ({title,overview}) => {

  const dispatch=useDispatch();

  const isMute=useSelector((store)=>store.config.mute);

  const handleMute=()=>{
    if(isMute===0){
      dispatch(changeUnmuteToMute());
    }
    else{
      dispatch(changeMuteToUnmute());
    }
  }

  return (
    <div className=' w-screen aspect-video pt-[18%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='pt-28 md:pt-0 text-2xl md:text-5xl font-bold '>{title}</h1>
      <p className='hidden md:inline-block py-6 text-lg w-1/2'>{overview}</p>
      <div className='my-6 md:my-0'>
        <button className='bg-white text-black px-4 py-1 md:px-10 md:py-1 rounded-md text-xl font-bold hover:opacity-80'>{/*"\u25B6"*/}▷ Play</button>
        <button className=' hidden md:inline-block mx-2 bg-gray-500 bg-opacity-50 text-white px-8 py-[7px] rounded-md hover:opacity-80'>🛈 More Info</button>
      <button 
      onClick={handleMute}
      className='p-3 m-4 rounded-full border 1px border-white hover:bg-gray-700'>{isMute===0?<GoMute />:<GoUnmute/>}</button>
      </div>
    </div>
  )
}

export default VideoTitle;