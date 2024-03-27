import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
const Thankyou = () => {
  return (
    <div className='min-h-screen mt-24'>
      <Head>
        <title>Thank You!- for submiting the test</title>
        <meta name="description" content="Thank you for submitting the test. We will review your submission promptly and get back to you as soon as possible." />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 text-center bg-slate-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-green-500 mb-6 bg-gray-50 rounded-full p-4 navfont font-bold "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h1 className="text-3xl md:text-5xl font-bold text-white navfont mb-4">Thank You!</h1>
        <p className="text-lg text-white navfont mb-8">Your test has been successfully submitted.</p>
        <Link href="/">
          <button className="text-white font-semibold  transition duration-300 ease-in-out bg-blue-600 p-4 m-2 rounded-full navfont w-52 lg:w-96">
            Return to Home
          </button>
        </Link>
      </main>

      <footer className="w-full h-16 flex justify-center items-center border-t mt-auto bg-gray-200">
        <p className="text-gray-600 navfont">We will review your submission promptly and get back to you as soon as possible.</p>
      </footer>
    </div>
  )
}

export default Thankyou
