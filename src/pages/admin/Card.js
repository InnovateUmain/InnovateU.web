import React from 'react'
import Image from 'next/image'
import { FaUsers } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
const Card = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400"><FaUsers className='text-4xl '/></div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Members</h3>
            <p className="text-3xl">12,768</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
        <RiUserStarFill className='text-4xl '/> </div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Applied (Devcon 2k24)Members</h3>
            <p className="text-3xl">39,265</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-indigo-400"><FaRupeeSign className='text-4xl ' /></div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Payments</h3>
            <p className="text-3xl">142,334</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400"><IoTicketSharp className='text-4xl '/> </div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Tickets Claimed</h3>
            <p className="text-3xl">58,555</p>
        </div>
    </div>
</div>
    </div>
  )
}

export default Card
