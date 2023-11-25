import React, { useState } from 'react'
import { FaRegClipboard } from "react-icons/fa6";
const Partner = () => {
    const [copy,setCopy] = useState(false);
    function myFunction() {
        // Get the text field
        setCopy(true);
        var copyText = document.getElementById("myInput");
        navigator.clipboard.writeText(copyText.innerText);
      
    setTimeout(()=>{
setCopy(false);
    },2000)
      }

  return (
    <div id='partner'>
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
          <div className='flex justify-center items-center flex-col'>
          <h1 className='sm:text-4xl fontevent text-white lg:text-5xl text-4xl my-2'>Partner With Us</h1>
          <div className='h-2 w-56 bg-purple-600 rounded-full'></div>
          <p className='fontevent text-white lg:w-[80vh] my-4 text-center w-[90vw]'>You can partner with us if you want to host hackathons, talks and events. Let’s help each other and grow together!</p>
          </div>
          <div className='flex justify-center items-center'>
          <div className='mx-4 fontevent px-6 py-4 border-2 border-white rounded-full my-2 text-white lg:text-lg hover:bg-black' id='myInput'>
          techinnovateu@gmail.com
         
          </div>
          <div className=' bg-purple-600 text-white rounded-full py-2 px-2 mx-6 h-16 w-16 flex justify-center items-center ' onClick={myFunction}>
          <FaRegClipboard className='lg:text-2xl sm:text-xl md:text-2xl text-xl'/>
          
          </div>
          
          
          </div>
         {copy&&<div className='bg-white rounded  h-6 w-20 text-center mx-[55vw]'>Copied</div>} 
    </div>
  )
}

export default Partner
