/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import { MdEventNote } from "react-icons/md";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import toast,{ Toaster } from 'react-hot-toast';
import Link from 'next/link';
// import Razorpay from "razorpay";
const Payment = () => {
    const userinfo = useSelector((state)=>state.userData);
    let orderid = Math.floor(Math.random() * 1000000);
    const router = useRouter();
    const handlePayment=async(e)=>{
      try{
        var options =  {
          key: `${process.env.NEXT_PUBLIC_KEY_ID}`,
           // Enter the Key ID generated from the Dashboard
          amount: 500, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "InnovateU", //your business name
          description: "Devcon 2k24 Registration fees.",
          image: "https://res.cloudinary.com/dawzncoau/image/upload/v1701193584/InnovateU-removebg-preview_sgnisw.png",
          order_id: router.query.orderid, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          callback_url: `${process.env.NEXT_PUBLIC_HOST}/api/payment`,
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
            name: userinfo.name, //your customer's name
            email: userinfo.email,
            contact: userinfo.phone, //Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#FD0872",
          },
        };
        var rzp1 = new window.Razorpay(options);
        await rzp1.open();
        e.preventDefault()
      }
       catch(err){
        toast.error('Payment Failed . Please reload the page and try again')
        window.location.reload();
       }
    }
  return (
   
   <div className='flex justify-center items-center min-h-screen'>
   <style jsx global>
{`
 @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
 .fontevent{
   font-family: 'Cabin', sans-serif;
 }
font-families {
    font-family: 'Cabin', sans-serif;
}

.bg-w-images {
    background-image: url('/pattern-background-desktop.svg');
}

@media (max-width: 375px) {
    .bg-w-images {
        background-image: url('/pattern-background-mobile.svg');
    }
}

`}
   </style>
   <Toaster position="top-center" reverseOrder={false}/>
   <div className="shadow-[0_16px_16px_-8px_rgba(118,108,241,0.3)] max-w-sm bg-white m-6 flex flex-col rounded-2xl overflow-hidden justify-center relative lg:top-8 top-10">
  <img
    src="/illustration-hero.svg"
    alt="Happy person happily dancing to music"
  />
  <div className="p-6 pb-4">
    <h2 className="mt-2 text-2xl font-black text-neutral-dark-blue text-center">
      Order Summary
    </h2>
    <p className="text-base text-center mx-2 my-5 text-neutral-desaturated-blue fontevent">
    Experience Devcon 2k24 live! Immerse in tech talks, hands-on workshops, and networking, all offline. Join us for a memorable in-person event
    </p>
    <div className="flex gap-4 text-sm items-center mb-6 p-4 bg-neutral-very-pale-blue rounded-lg">
      <MdEventNote className='text-purple-500 text-4xl'/>
     
      <div>
        <h3 className="text-neutral-dark-blue font-black">Devcon 2K24</h3>
        <span className="text-neutral-desaturated-blue font-bold">
        ₹ 500
        </span>
      </div>
      <a
        href="#"
        className="ml-auto text-primary-bluish-purple underline font-bold hover:text-primary-medium-slate-blue hover:no-underline"
      >
        Ticket - 1
      </a>
    </div>
    <motion.button className="shadow-[0_16px_16px_-4px_rgba(118,108,241,0.3)] hover:bg-blue-medium-slate-blue w-full bg-blue-700 rounded-lg py-3 text-white font-bold" onClick={handlePayment} whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:1}}>
      Proceed to Payment
    </motion.button>
    <Link href="/Event">
    <motion.button className="hover:text-neutral-dark-blue w-full text-neutral-desaturated-blue font-bold py-3 mt-2" whileHover={{scale:1.1}} whileTap={{scale:0.9,rotate:1}}>
      Cancel Order
    </motion.button>
    </Link>
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </div>
</div>

</div>

    
  )
}

export default Payment
