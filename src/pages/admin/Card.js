import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FaUsers } from "react-icons/fa6";
import { RiUserStarFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { IoTicketSharp } from "react-icons/io5";
import { set } from 'mongoose';
const Card = () => {
    const [user , setUser] =useState([]);
    const [ticket , setTicketClaimed] = useState([]);
    const [eventpaid,seteventpaid]=useState([]);
    const [payment,setPayment]=useState(0);
    useEffect(()=>{
      fetchuser();
        fetchticket();
        fetcheventpaid();  
    },[])
    const fetchuser=async()=>{
        const data ={id:"innovateUadminhandle",status:"user"};
        const pr = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getalldata`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await pr.json();
       if(res.data!=null){
          setUser(res.data)
       }
    }
    const fetchticket=async()=>{
        const data ={id:"innovateUadminhandle",status:"ticketclaimed"};
        const pr = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getalldata`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await pr.json();
       if(res.data!=null){
          setTicketClaimed(res.data)
       }
    }
    const fetcheventpaid=async()=>{
        const data ={id:"innovateUadminhandle",status:"eventpaid"};
        const pr = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/getalldata`, {
          method: "POST", // or 'PUT'
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const res = await pr.json();
       if(res.data!=null){
          seteventpaid(res.data)
          res.data.map((item)=>{
            setPayment(payment+parseInt(item.paymentamount))
          })
       }
    }
    
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-4 sm:px-8">
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-green-400"><FaUsers className='text-4xl '/></div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Members</h3>
            <p className="text-3xl">{user.length}</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-blue-400">
        <RiUserStarFill className='text-4xl '/> </div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Applied (Devcon 2k24)Members</h3>
            <p className="text-3xl">{eventpaid.length}</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-indigo-400"><FaRupeeSign className='text-4xl ' /></div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Payments</h3>
            <p className="text-3xl">{payment}</p>
        </div>
    </div>
    <div className="flex items-center bg-white border rounded-sm overflow-hidden shadow">
        <div className="p-4 bg-red-400"><IoTicketSharp className='text-4xl '/> </div>
        <div className="px-4 text-gray-700">
            <h3 className="text-sm tracking-wider">Total Tickets Claimed</h3>
            <p className="text-3xl">{ticket.length}</p>
        </div>
    </div>
</div>
    </div>
  )
}

export default Card
