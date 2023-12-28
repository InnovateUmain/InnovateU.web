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
  const [user,setUser]=useState(false);
  //import preline
  useEffect(() => {
    import("preline");
  }, [])
  //user and router details
  useEffect(()=>{
    router.events.on('routeChangeStart',()=>{
      setProgress(40)
    })
    router.events.on('routeChangeComplete',()=>{
      setProgress(100)
    });
    if(localStorage.getItem("innovateUuser")){
      setUser(true);
    }
    
  },[router.query])

  const logout=()=>{
    localStorage.removeItem("innovateUuser");
    setUser(false);
      }
  return <><Provider store={store}><LoadingBar
  color='#c307ed'
  waitingTime={400}
  progress={progress}
  onLoaderFinished={() => setProgress(0)}
/><Navbar user={user} logout={logout}/><Component {...pageProps} /> <Footer/></Provider></>
}
