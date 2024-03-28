import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = ({error}) => {
  const navigate=useNavigate();
  return (
    <div className=''>
      <img 
      className='-mt-10 absolute h-screen md:w-screen md:object-cover'
      src='https://png.pngtree.com/thumb_back/fh260/background/20211204/pngtree-system-error-background-image_918400.png'/>
      <h1 className='relative z-10 text-center my-10 text-3xl md:text-6xl text-white font-bold'>Something Went Wrong!!!</h1>
      <p className='relative z-10 text-center my-12 text-white'>Might be a network problem,Go back and refresh the page!!</p>
      <button className='relative z-10 mx-[45%] py-2 px-5 md:px-4 bg-blue-700 text-white rounded-lg hover:opacity-80 active:opacity-55'
        onClick={()=>navigate("/browse")}
        >GoBack</button>
    </div>
  )
}

export default Error;