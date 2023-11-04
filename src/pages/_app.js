import '@/styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router=useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    });
 
  },[router.query])
  return <><LoadingBar
  color='#eb1d0e'
  waitingTime={400}
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/><Navbar/><Component {...pageProps} /></>
}
