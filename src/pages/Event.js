import React, { useEffect } from 'react'
import { MdEvent } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { FaMicrophone } from "react-icons/fa";

import Link from 'next/link';
const Event = () => {
  const [event, setEvent] = React.useState([]);
  const fetchEvents = async () => {
    const data = { status: "get" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addevent`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setEvent(result.event);
  }
  useEffect(() => {
fetchEvents();
  }, [])

  return (
    <div className=' my-20  bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r'>
  <div className=''>
  <div className=" flex justify-center items-center  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex-col mb-10 h-full">
  <div
        className="bg-white items-center justify-between flex rounded shadow-lg my-4 lg:w-[80vw] w-[90vw]"
        style={{ top: 5  }}
      >
        <div>
          <div className="p-2 mr-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <svg
              className="h-6 w-6 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <input
          className="font-bold uppercase rounded-full w-full py-4 pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
          type="text"
          placeholder="Search"
        />
        <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
          <svg
            className="w-6 h-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 space-y-4 md:space-y-0">
    {event.map((item)=>(<Link href={`/components/Events/Eventdetails?id=${item._id}`} key={item._id}>
      <div className="max-w-sm bg-white px-6 pt-6  rounded-xl shadow-lg transform hover:scale-105 transition duration-500 mx-2" style={{height:"500px"}}>
        
       <div className="relative">
          <img
            className="w-full rounded-xl object-cover h-60 w-96"
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt="Colors"
          />
          <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            FREE
          </p>
          {/* <p className="absolute top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">
            $12
          </p> */}
          {/* <p className="absolute top-0 right-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-tr-lg rounded-bl-lg">
            %20 Discount
          </p> */}
        </div>
        <h1 className="mt-4 text-gray-800 text-xl font-bold cursor-pointer navfont">
          {item.eventname}
        </h1>
        <div className="my-4">
          <div className="flex space-x-1 items-center">
            <span>
             
            <MdEvent className='text-indigo-600 text-2xl'/>
            </span>
            <p className='navfont text-sm mb-1.5'>{item.eventdate} | {item.eventtime}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
            <MdLocationOn className='text-indigo-600 text-2xl mb-1.5'/>
            </span>
            <p className='navfont text-sm'>{item.eventvenue}</p>
          </div>
          <div className="flex space-x-1 items-center">
            <span>
            <FaMicrophone className='text-indigo-600 text-2xl mb-1.5'/>
            </span>
            <p className='navfont text-sm'>{item.eventspeaker}</p>
          </div>
          <button className="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg navfont">
            Show More
          </button>
        </div>
      </div>
      </Link>))}
      
      
    </div>
  </div>
</div>

    </div>
  )
}

export default Event
