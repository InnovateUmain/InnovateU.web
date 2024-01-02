import React, { useEffect, useState } from 'react'

const Team = () => {
    const [array,setArray]=useState([])
    // Team members data
const teamMembers = [
    {
      name: 'Oliver Aguilerra',
      role: 'Product Manager',
      image: 'https://res.cloudinary.com/dawzncoau/image/upload/v1701185942/bohemian-man-with-his-arms-crossed-removebg-preview_jkathe.png',
      description: "Vincent Van Gogh’s most popular painting, The Starry Night."
    },
    {
      name: 'Marta Clermont',
      role: 'Design Team Lead',
      image: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: "Amet I love liquorice jujubes pudding croissant I love pudding."
    },
    {
      name: 'John Doe',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: "Passionate about creating efficient and scalable software solutions."
    },
    {
      name: 'Alice Johnson',
      role: 'Marketing Specialist',
      image: 'https://images.pexels.com/photos/3182767/pexels-photo-3182767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      description: "Strategizing and executing marketing campaigns to drive brand awareness."
    },
    // {
    //   name: 'Ethan Williams',
    //   role: 'UX/UI Designer',
    //   image: 'https://images.pexels.com/photos/3768165/pexels-photo-3768165.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    //   description: "Creating delightful user experiences through intuitive and visually appealing designs."
    // },
    // Add more team members
  ];
  
  useEffect(()=>{
    setArray(teamMembers);
  },[])
  
 
  return (
    <>
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
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl '>Our Mentors</h1>
        <div className='h-2 w-56 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
        
      </div>
     <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 ">
     {teamMembers.map((item) => (
  <div key={item.name} > 
    <div className="z-10 relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
        <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900'>
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.image}`}
        alt="Person"
      />
        </div>
    
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.role}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.description}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
))}    
    </div>
    <div className='flex flex-col justify-center items-center my-8'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>InnovateU Leads</h1>
        <div className='h-2 w-56 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
     {teamMembers.map((item) => (
  <div key={item.name}>
    <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
    <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 shadow-gray-100 shadow-inner' >
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.image}`}
        alt="Person"
      />
        </div>
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.role}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.description}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
))}    


    </div>
    <div className='flex flex-col justify-center items-center my-8'>
        <h1 className='text-white fontevent lg:text-5xl md:text-4xl text-4xl'>Core Community Maintainers</h1>
        <div className='h-2 w-96 bg-purple-600 rounded-full my-4 text-center'></div>
        </div>
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
     {teamMembers.map((item) => (
  <div key={item.name}>
    <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
    <div className='object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 shadow-gray-100 shadow-inner'>
        <img
        className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-lg"
        src={`${item.image}`}
        alt="Person"
      />
        </div>
        <p className="mb-1 text-lg font-bold text-gray-100 my-4 fontevent text-center">{item.name}</p>
      <div className="absolute inset-0 flex flex-col justify-center px-5 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
        <p className="mb-1 text-lg font-bold text-gray-100">{item.name}</p>
        <p className="mb-4 text-xs text-gray-100">{item.role}</p>
        <p className="mb-4 text-xs tracking-wide text-gray-400">
          {item.description}
        </p>
        <div className="flex items-center justify-center space-x-3">
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white transition-colors duration-300 hover:text-teal-accent-400"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5">
              <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
))}    


    </div>
    </div>
    </div>
    </>
  )
}

export default Team
