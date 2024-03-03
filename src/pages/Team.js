import React, { useEffect, useState } from 'react'
import Cardskeleton from './components/skeleton/Cardskeleton';
import Head from 'next/head';
import { FaXTwitter ,FaGithub} from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
const Team = () => {
    const [array,setArray]=useState([]);
    const[member,setMember]=useState([]);
    const[manager,setManager]=useState([]);
    const [lead,setLead]=useState([]);
    const [loading,setLoading]=useState(false);
    //fetchlead
 const fetchlead = async () => {
  setLoading(true);
  const data = { status: "lead"};
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
    {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  setLoading(false);
  if (result.success) {
    setLead(result.data);
  }

 }
 //fetchmember
  const fetchmember = async () => {
    const data = { status: "member"};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      setMember(result.data);
    }
  }
  //fetchmanager
  const fetchmanager = async () => {
    const data = { status: "manager"};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setLoading(false);
    if (result.success) {
      setManager(result.data);
    }
  }

  useEffect(()=>{
    fetchlead();
    fetchmanager();
    fetchmember();
  },[])
  console.log(lead);
  console.log(manager);
  console.log(member);
  
  
  
 
  return (
    <>
    <Head>
      <title>InnovateU - Team</title>
    </Head>
    {loading?<div className='my-20'><Cardskeleton/></div>:<div>
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
    <div>
        
     <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-purple-600 uppercase rounded-full bg-teal-accent-400 " >
            Team
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl '>InnovateU Leads</h1>
        <div className='h-2 w-56 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
        
      </div>
     <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
     {lead.map((item) => (
  <div key={item.name} className=''> 
    <div className="z-10 relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl ">
        <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900'>
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.img}`}
        alt="Person"
      />
        </div>
    
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.title}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.desc}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <Link
            href={`${item.twitter}`}
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
            target='_blank'
          >
            <FaXTwitter className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.linkedin}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaLinkedin className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.github}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaGithub className='h-5 w-5'/>
          </Link>
        </div>
      </div>
    </div>
  </div>
))}    
    </div>
    <div className='flex flex-col justify-center items-center my-8'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>Community Managers</h1>
        <div className='h-2 w-56 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
     {manager.map((item) => (
  <div key={item.name}>
    <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
    <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 shadow-gray-100 shadow-inner' >
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.img}`}
        alt="Person"
      />
        </div>
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.title}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.desc}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <Link
            href={`${item.twitter}`}
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
            target='_blank'
          >
            <FaXTwitter className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.linkedin}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaLinkedin className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.github}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaGithub className='h-5 w-5'/>
          </Link>
        </div>
      </div>
    </div>
  </div>
))}    


    </div>
    <div className='flex flex-col justify-center items-center my-8'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>Community Members</h1>
        <div className='h-2 w-96 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
     {member.map((item) => (
  <div key={item.name}>
    <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
    <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 shadow-gray-100 shadow-inner'>
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.img}`}
        alt="Person"
      />
        </div>
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.title}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.desc}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <Link
            href={`${item.twitter}`}
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
            target='_blank'
          >
            <FaXTwitter className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.linkedin}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaLinkedin className='h-5 w-5'/>
          </Link>
          <Link
            href={`${item.github}`}
            target='_blank'
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <FaGithub className='h-5 w-5'/>
          </Link>
        </div>
      </div>
    </div>
  </div>
))}    


    </div>
    </div>
    </div>
    </div>}
    </>
  )
}

export default Team
