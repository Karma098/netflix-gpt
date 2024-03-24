import React from 'react'

const VideoTitle = ({title,overview}) => {

  return (
    <div className='w-screen aspect-video pt-[22%]  px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='text-5xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/2'>{overview}</p>
      <div className=''>
        <button className='bg-white text-black px-10 py-1 rounded-md text-xl font-bold hover:opacity-80'>{/*"\u25B6"*/}▷ Play</button>
        <button className=' mx-2 bg-gray-500 bg-opacity-50 text-white px-8 py-[7px] rounded-md hover:opacity-80'>🛈 More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle;