import React, { useEffect, useState } from 'react'
import { BsCheck2Circle} from 'react-icons/bs';
import { motion } from 'framer-motion';
import toast,{ Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Spinner from './components/Spinner';
const Login = () => {
    const router = useRouter();
    useEffect(()=>{
if(localStorage.getItem('innovateUuser')){
    toast.error('Ohh! You are already logged in ...');
    setTimeout(()=>{
        router.push('/')
       
    },2000)


}
    },[])
    
    const [emailt, setEmailt] = useState(false);
    const [result, setResult] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [loading , setLoading] = useState(false);
    const [text,setText]= useState("");
    const handleChange = (e) => {
    
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }
    const Restart=()=>{
 
        setEmail('');
        setPassword('');
        setResult(false);
        setEmailt(false);
    }
    const handleLogin = async (e) => {
        if(email===''||password===''){
            toast.error('Please fill all the fields');
        }
        else if(!email.includes('@')||!email.includes('.')){
            toast.error('Please enter a valid email');
        }
        else if(password.length<6){
            toast.error('Password must be atleast 6 characters long');
        }
        else{
            setLoading(true);
            const data = {email:email.toLowerCase(),password};

            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              });
              const response=await res.json();
              setLoading(false);
              if(response.success){
                  toast.success(response.message);
                  setEmail('');
                  setPassword('');
                  setResult(false);
                  setEmailt(false);
                  localStorage.setItem('innovateUuser',JSON.stringify({token:response.token,email:response.email}));
                  setTimeout(()=>{
                    router.push('/')
                    },2000)
              }
              else{
                  toast.error(response.message);
              }
        }
    }
    const originalText = "To Login, could you give us your few details?";
    const speed = 50;
  
    useEffect(() => {
      let i = 0;
  
      const typeWriter = () => {
        if (i <= originalText.length) {
          setText(originalText.substring(0, i));
          i++;
          setTimeout(typeWriter, speed);
        }
      };
  
      typeWriter();
    }, []);
  return (
    <div className='text-white flex justify-center items-center'>
        <Toaster position="top-center" reverseOrder={false}/>
        <video src="https://res.cloudinary.com/dst73auvn/video/upload/v1701241450/Login_bg_p8pvqt.mp4" className='w-[100vw] h-[100vh] object-cover' autoPlay muted loop></video>
        
     {!loading?<motion.section className='absolute top-36' drag dragConstraints={{left:0,right:6,top:4,bottom:4}}>
     <div className="flex flex-col md:w-[50vw] md:h-auto bg-gray-900 text-gray-200 font-mono lg:w-[60vw] lg:h-auto sm:w-[90vw] sm:h-auto w-[80vw] h-auto">
     <form >
    <div className="flex items-center h-10 px-4 bg-gray-800">
        <div className="h-3 w-3 mr-2 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 mr-2 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
    </div>

    <div className="flex-1 p-4">
        
        <h1 className='my-2 mx-2'>{text}</h1>
      
        <motion.div className="flex my-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
       
            <div className="mr-2">&gt; <span className='text-green-600'>~</span></div>
            Email:  <input type="email" name="email" value={email} onChange={handleChange} className="flex-1 bg-gray-800 focus:outline-none" placeholder="Enter Your Email" onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    setEmailt(true);
                }
                else{
                    setEmailt(false);
                }
            }}/>
             </motion.div>
            {emailt&&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <div className='flex my-2'>
<BsCheck2Circle className='text-green-600 text-2xl'/>
<h1 className='text-green-600 mx-2'>{email}</h1>
            </div>
            <div className='flex my-2'>
            <div className="mr-2">&gt; <span className='text-green-600'>~</span></div>
                 Password : <input type="password" name="password" value={password} onChange={handleChange} className="flex-1 bg-gray-800 focus:outline-none" placeholder="Enter Your Password" onKeyDown={(e)=>{
                     if(e.key === 'Enter'){
                         setResult(true);
                     }
                 }} autoFocus/>
                
                 </div>
                
                
                 </motion.div>
            }
             
            {
               result&& <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
 
        <div className="mt-2">
            <span className="text-green-500">&gt; Output:</span>
            <div className="bg-gray-900 p-2 mt-1">
                <motion.button className='px-4 py-2 text-white font-semibold bg-transparent border-gray-200 border-2 rounded mx-2' whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:2}} onClick={handleLogin}>Login</motion.button>
                <motion.button className='px-4 py-2 text-white font-semibold bg-transparent border-gray-200 border-2 rounded mx-2' whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:2}} onClick={Restart}>Restart</motion.button>
               
            </div>
           
        </div>
       
                </motion.div>
            }
       

    </div>
    </form>
</div>

<h1 className='text-center my-4'>Not an account ?<Link href={"/Signup"} className='text-green-400'> Create a new account !</Link></h1>
     </motion.section>:<Spinner/>}
    
  </div>
  )
}

export default Login
