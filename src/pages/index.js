import React from 'react'
// import Hero from './components/Hero';
import Hero1 from './components/Hero1';
import About from './components/About';
import Stats from './components/Stats';
import Events from './components/Events';
import Sponsor from './components/Sponsor';
import Testimonials from './components/Testimonials';
import Mentorship from './components/Mentorship';
import Newsroom from './components/Newsroom';
const Index = () => {
  // https://res.cloudinary.com/dst73auvn/image/upload/v1699904650/giphy_dmein5.gif
  // https://res.cloudinary.com/dst73auvn/image/upload/v1699904652/1_NuTQuFZpT8RxNEtkSh3W5A_u4fodg.gif
  return (
  <>
<img src=" https://res.cloudinary.com/dst73auvn/image/upload/v1699904650/giphy_dmein5.gif" alt="" className='w-[100vw] h-[100vh] ' style={{opacity:0.7}}/>
  <div className="sm:overflow-x-hidden overflow-x-auto md:overflow-x-hidden bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
  <Hero1/>
  <About/>
  <Stats/>
  <Events/>
  <Sponsor/>
  <Testimonials/>
  <Mentorship/>
  <Newsroom/>
  </div>
  </>
  )
}

export default Index
