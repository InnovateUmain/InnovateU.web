/* eslint-disable @next/next/no-sync-scripts */
import React, { useEffect } from 'react'
// import Hero from './components/Hero';
import Hero1 from './components/Hero1';
// import About from './components/About';
import { About } from '@/sections';
import { GetStarted ,WhatsNew,Feedback} from '@/sections';
import Stats from './components/Stats';
// import Events from './components/Events';
import Sponsor from './components/Sponsor';
import Testimonials from './components/Testimonials';
import Mentorship from './components/Mentorship';
import Newsroom from './components/Newsroom';
import Partner from './components/Partner';
import Faq from './components/Faq';
import Contact from './components/Contact';
import { Footer } from '@/components';
import { Insights } from '@/sections';
import { useDispatch } from 'react-redux';
import { addUserData } from '@/appstore/userData';
import { useSelector } from 'react-redux';
const Index = () => {
  const dispatch = useDispatch();
  const getUser=async(token)=>{
    console.log(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuserdata`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    const result = await res.json();
    dispatch(addUserData({name:result.data.name,email:result.data.email,img:result.data.img,linkedin:result.data.linkedin,github:result.data.github,website:result.data.website,phone:result.data.phone,bio:result.data.bio,clg:result.data.clg,title:result.data.title}))
  }
  useEffect(()=>{
    if(localStorage.getItem('innovateUuser')){
      const data = JSON.parse(localStorage.getItem('innovateUuser')).token;

      getUser(data);
    }
  },[])
  const info = useSelector((state)=>state.userData)
  // console.log(info)
  // https://res.cloudinary.com/dst73auvn/image/upload/v1699904650/giphy_dmein5.gif
  // https://res.cloudinary.com/dst73auvn/image/upload/v1699904652/1_NuTQuFZpT8RxNEtkSh3W5A_u4fodg.gif
  return (
  <>
{/* <img src=" https://res.cloudinary.com/dst73auvn/image/upload/v1699904650/giphy_dmein5.gif" alt="" className='w-[100vw] h-[100vh] ' style={{opacity:0.7}}/> */}

  <div className="overflow-hidden scroll-smooth bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
  <Hero1/>
  <About/>
  <div className="relative">
      <GetStarted />
      <div className="gradient-04 z-0" />
      {/* <WhatsNew /> */}
    </div>
  {/* <Stats/> */}
  {/* <Events/> */}
  <Sponsor/>
  <Testimonials/>
  {/* <Mentorship/> */}
  <Newsroom/>
  {/* <Partner/> */}
  <Insights/>
  <Contact/>
  <Footer/>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </div>
  </>
  )
}

export default Index
