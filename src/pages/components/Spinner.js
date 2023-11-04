import React from 'react'

const Spinner = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center absolute'>
      <div className='flex flex-col items-center justify-center gap-2'>
      <img
                src="https://res.cloudinary.com/dst73auvn/image/upload/v1698952130/2-removebg-preview_ljkree.png"
                alt=""
                className="h-1/8 w-28 -scale-90 animate-floating1"
              />
              <div class="race-by"></div>
      </div>

</div>
  )
}

export default Spinner

