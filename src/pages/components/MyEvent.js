import React from 'react'

const MyEvent = () => {
  return (
    <div className='flex justify-center items-center min-h-screen'>
    <style jsx>
{
  `
  @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
  .fontevent{
    font-family: 'Cabin', sans-serif;
  }
  `
}
          </style>
      <div className='  text-white rounded relative top-2  bg-gray-800 h-[80vh] w-[90vw] '>
        <div className='flex flex-col justify-center items-center my-4'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>My Events (1) </h1>
                  <div className='h-2 w-56 bg-purple-600 rounded-full my-4'></div>
        </div>
      
        <div className='flex flex-wrap item-center justify-center mx-4 my-4
       '>
        

    {/* component */}
    <div className="lg:flex shadow rounded-lg border  border-gray-400 bg-purple-300">
    <div className="bg-purple-600 rounded-lg lg:w-2/12 py-4 block h-full shadow-inner">
      <div className="text-center tracking-wide">
        <div className="text-white font-bold text-4xl ">24</div>
        <div className="text-white font-normal text-2xl">Sept</div>
      </div>
    </div>
    <div className="w-full  lg:w-11/12 xl:w-full px-1 bg-white py-5 lg:px-2 lg:py-2 tracking-wide">
      <div className="flex flex-row lg:justify-start justify-center">
        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
          <i className="far fa-clock" /> 1:30 PM
        </div>
        <div className="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
          Organiser : IHC
        </div>
      </div>
      <div className="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
        International Conference Dubai
      </div>
      <div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
        A-142/1, A-142, Ganesh Nagar, Tilak Nagar, New Delhi, 110018
      </div>
    </div>
    <div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
      <span className="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
        Going
      </span>
    </div>
  </div>
</div>
<div id="raffle-red" class="entry raffle">
        <div class="no-scale"></div>
  </div>

      </div>
      
    </div>
  )
}

export default MyEvent
