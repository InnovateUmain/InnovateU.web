import React from 'react'
import Hero from './components/Hero';
import About from './components/About';
const Index = () => {
  return (
  <>

  <div className="sm:overflow-x-hidden overflow-x-auto md:overflow-x-hidden">
  <img src="https://opinhacks.co/static/media/space-lines.fc6b21dd9d358c1b1e63.gif" alt="" className='w-[100vw] h-[100vh] ' style={{opacity:0.7}}/>
  <Hero/>
  <About/>
  </div>
  </>
  )
}

export default Index
