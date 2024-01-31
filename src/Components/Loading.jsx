import React from 'react'
import loader from '/giphy.gif'
const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-black'>
   <img className=' object-cover w-[50%]' src={loader} alt="" />
    </div>
  )
}

export default Loading