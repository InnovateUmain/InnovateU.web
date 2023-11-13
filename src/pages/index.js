import React from 'react'
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
const Index = () => {
  return (
  <>

  <div className="sm:overflow-x-hidden overflow-x-auto md:overflow-x-hidden bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900">
  <img src="https://opinhacks.co/static/media/space-lines.fc6b21dd9d358c1b1e63.gif" alt="" className='w-[100vw] h-[100vh] ' style={{opacity:0.7}}/>
  <Hero/>
  <About/>
  <Stats/>
  </div>
  </>
  )
}

export default Index
