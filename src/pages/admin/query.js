import React, { useState } from 'react'
import theme from "../../../trc/theme/theme";
import toast,{Toaster} from 'react-hot-toast'
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import Spinner from '../components/Spinner';
const Query = () => {
  const[name,setName]=useState('')
    const[email,setEmail]=useState('')
    const[message,setMessage]=useState('')
    const[loading,setLoading]=useState(false)
    const handleChange=(e)=>{
        if(e.target.name=='name'){
            setName(e.target.value)
        }
        if(e.target.name=='email'){
            setEmail(e.target.value)
        }
        if(e.target.name=='message'){
            setMessage(e.target.value)
        }
    }
const handleSubmit=async()=>{
if(name.length<3){
    toast.error('Name must be atleast 3 characters long')
}
else if(email.includes('@')==false||email.includes('.')==false){
    toast.error('Invalid Email')
}
else if(message.length<10){
    toast.error('Message must be atleast 10 characters long')
}
else{
    setLoading(true)
    const data={name,email,message}
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/contact`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        setLoading(false)
      const response=await res.json();
        if(response.success){
            setName('')
            setEmail('')
            setMessage('')

            toast.success('Message sent successfully')
        }
        else{
            toast.error('Something went wrong')
        }
}
}
  return (
      <ThemeProvider theme={theme}>
       <FullLayout>
       <Toaster/>
       <style jsx global>{`
        
        #footer {
          display:none;
        }
        #navbar{
          display:none;
        }
      `}</style>
       {loading?<div className='flex justify-center'><Spinner/></div>:<section className="bg-white dark:bg-gray-900">
  <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
      <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Raise a new query</h2>
      <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Account related problem ? Facing some error while using app ? Need details about our Business plan? Let us know.</p>
      <div action="#" className="space-y-8">
          <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
              <input type="email" id="email"  name="email" value={email} onChange={handleChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required/>
          </div>
          <div>
              <label htmlFor="subject"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
              <input type="text" name="name" onChange={handleChange} value={name} id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Enter Your Name" required/>
          </div>
          <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
              <textarea id="message" rows="6" value={message} name='message' onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."/>
          </div>
          <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-blue-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleSubmit}>{loading?"Sending....":"Send message"}</button>
      </div>
  </div>
</section>}
       </FullLayout>
      </ThemeProvider> 
 
  )
}

export default Query