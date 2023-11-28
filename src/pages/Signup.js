import React, { useEffect, useState } from 'react'
import { BsCheck2Circle} from 'react-icons/bs';
import { motion } from 'framer-motion';
import toast,{ Toaster } from 'react-hot-toast';;
import Spinner from './components/Spinner';
const Signup = () => {
    const [emailt, setEmailt] = useState(false);
    const [passwordt, setPasswordt] = useState(false);
    const [num, setnum] = useState(false);
    const [result, setResult] = useState(false);
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [phone , setPhone] = useState('');
    const [loading , setLoading] = useState(false);
    const [text, setText] = useState('');
   
    const originalText = "To start, could you give us your few details?";
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
    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        }
        else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
        else if(e.target.name === 'phone'){
            setPhone(e.target.value)
        }
    }
    const Restart=()=>{
        setName('');
        setEmail('');
        setPassword('');
        setResult(false);
        setPasswordt(false);
        setEmailt(false);
    }
    const handleSubmit = async (e) => {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        if(name===''||email===''||password===''){
            toast.error('Please fill all the fields');
        }
        else if(phone.length!==10){
            toast.error('Please enter a valid phone number');
        }
        else if(password.length<6){
      toast.error('Password must be atleast 6 characters long');
        }
        else if(!email.includes('@')||!email.includes('.')){
            toast.error('Please enter a valid email');
        }
        else if(!specialChars.test(password)){
            toast.error('Password must contain atleast one special character.');
        }
        else{
            setLoading(true);
            const data = {name,email,password,phone};
            const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
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
                  setName('');
                  setEmail('');
                  setPassword('');
                  setResult(false);
                  setPasswordt(false);
                  setEmailt(false);
                  setnum(false);
                  setPhone('');
              }
              else{
                toast.error(response.message);
              }
        }
    }

   
  return (

    <div className='text-white flex justify-center items-center'>
        <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Kanit&display=swap")
            @import
            url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
          .herofont {
            font-family: "Lilita One", sans-serif;
          }
          .font {
            font-family: "Kanit", sans-serif;
          }
          .navfont {
            font-family: "Rubik", sans-serif;
          }
        `}
      </style>
        <Toaster
  position="top-center"
  reverseOrder={false}
/>
        <img src="/login.gif" alt=""  className='w-[100vw] h-[100vh] relative bg-cover herofont'/>

     {!loading?<motion.section className='absolute top-36'  drag dragConstraints={{left:0,right:6,top:4,bottom:4}}>
     <div className="flex flex-col md:w-[50vw] md:h-auto bg-gray-900 text-gray-200 font-mono lg:w-[60vw] lg:h-auto sm:w-[90vw] sm:h-auto w-[90vw] h-auto">
    <div className="flex items-center h-10 px-4 bg-gray-800">
        <div className="h-3 w-3 mr-2 rounded-full bg-red-500"></div>
        <div className="h-3 w-3 mr-2 rounded-full bg-yellow-500"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
    </div>

    <div className="flex-1 p-4">
   
        <h1 className='my-2 mx-2' id='h1'>{text}</h1>
        <motion.div className="flex my-2" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
          
            <div className="mr-2">&gt; <span className='text-green-600'>~</span></div>
            Name :  <input type="text" name="name" value={name} onChange={handleChange} className="flex-1 bg-gray-800 focus:outline-none" placeholder="Enter Your Name" onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                    setEmailt(true);
                }
            }}/>
             </motion.div>
            {emailt&&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <div className='flex my-2'>
<BsCheck2Circle className='text-green-600 text-2xl'/>
<h1 className='text-green-600 mx-2'>{name}</h1>
            </div>
            <div className='flex my-2'>
            <div className="mr-2">&gt; <span className='text-green-600'>~</span></div>
                 Email : <input type="text" name="email" value={email} onChange={handleChange} className="flex-1 bg-gray-800 focus:outline-none" placeholder="Enter Your Email" onKeyDown={(e)=>{
                     if(e.key === 'Enter'){
                         setnum(true);
                     }
                 }} autoFocus/>
                 </div>
                 </motion.div>
            }
             {num&&
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
            <div className='flex my-2'>
<BsCheck2Circle className='text-green-600 text-2xl'/>
<h1 className='text-green-600 mx-2'>{email}</h1>
            </div>
            <div className='flex my-2'>
            <div className="mr-2">&gt; <span className='text-green-600'>~</span></div>
                 Phone : <input type="number" name="phone" value={phone} onChange={handleChange} className="flex-1 bg-gray-800 focus:outline-none" placeholder="Enter Your Phone" onKeyDown={(e)=>{
                     if(e.key === 'Enter'){
                         setPasswordt(true);
                     }
                 }} autoFocus/>
                 </div>
                 </motion.div>
            }
               {passwordt&&<motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{duration:1}}>
                <div className='flex my-2'>
<BsCheck2Circle className='text-green-600 text-2xl'/>
<h1 className='text-green-600 mx-2'>{phone}</h1>
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
               <div className='flex my-2'>
<BsCheck2Circle className='text-green-600 text-2xl'/>
<h1 className='text-green-600 mx-2'>{password}</h1>
            </div>
            
        <div className="mt-2">
            <span className="text-green-500">&gt; Output:</span>
            <div className="bg-gray-900 p-2 mt-1">
                <motion.button className='px-4 py-2 text-white font-semibold bg-transparent border-gray-200 border-2 rounded mx-2' whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:2}} onClick={handleSubmit}>Submit</motion.button>
                <motion.button className='px-4 py-2 text-white font-semibold bg-transparent border-gray-200 border-2 rounded mx-2' whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:2}} onClick={Restart}>Restart</motion.button>
            </div>
        </div>
      
                </motion.div>
            }
    </div>
</div>
{/* <h1 className='text-center my-4'>Have an account?<Link href={"/Login"} className='text-green-400'> Login Now !</Link></h1> */}
     </motion.section>:<Spinner/>}
  </div>
  )
}

export default Signup
