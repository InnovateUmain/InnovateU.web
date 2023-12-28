import '@/styles/globals.css'
import LoadingBar from 'react-top-loading-bar'
import Navbar from './components/Navbar'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import { store } from './appstore/store';
export default function App({ Component, pageProps }) {
  const router=useRouter();
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    import("preline");
  }, [])
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    });
 
  },[router.query])
  return <><Provider store={store}><LoadingBar
  color='#c307ed'
  waitingTime={400}
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/><Navbar/><Component {...pageProps} /> <Footer/></Provider></>
}
