import React from 'react'
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Box from '@mui/material/Box';
import toast,{Toaster} from "react-hot-toast";
import Modal from '@mui/material/Modal';
import { IoMdCloseCircle } from "react-icons/io";
import Spinner from '../components/Spinner';
import Head from 'next/head';
import { set } from 'mongoose';
const Myaccount = () => {
    //for modals start here
    const [width,setWidth]= useState(0);
    const [open, setOpen] = useState(false);
    const [testData,setTestData] = useState([]);
    const [loading,setLoading] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTestUpdate(false);
    };
    //fetching all tetsts start here
    const fetchAllTests = async()=>{
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
                {
                  method: "GET", // or 'PUT'
                  headers: {
                    "Content-Type": "application/json",
                  }
                }
              );
              const result = await res.json();
                setLoading(false);
            setTestData(result.tests);
    }
    //fetching all tests end here
        useEffect(()=>{
          var w = window.innerWidth;
         if(w>=500){
          setWidth(800);
         }
         else{
          setWidth(350);
         }
          fetchAllTests();
         },[])
         const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {width},
          bgcolor: 'background.paper',
          border: '2px solid purple',
          boxShadow: 24,
          borderRadius: "6px",
          p: 4,
        };
//for modals end here
//add test states start here
const [testname, setTestName] = useState('');
const [testype, setTestType] = useState('');
const [testdate, setTestDate] = useState('');
const [time , setTime] = useState('');
const [testRegCount, setTestRegCount] = useState('');
const [testtitle, setTestTitle] = useState('');
const [testdescription, setTestDescription] = useState('');
const [testbenefits, setTestBenefits] = useState([]);
const [testbchild, setTestBChild] = useState('');
const [actualTestDate, setActualTestDate] = useState('');
const [testUpdate, setTestUpdate] = useState(false);
const [id, setId] = useState('');
const handleChange = (e) => {
    if(e.target.name =='testname'){
        setTestName(e.target.value);
    }
    else if(e.target.name =='testtype'){
        setTestType(e.target.value);
    }
    else if(e.target.name =='testdate'){
        setTestDate(e.target.value);
        setActualTestDate(testdate+'T'+time+':00');
    }
    else if(e.target.name =='testtitle'){
        setTestTitle(e.target.value);
    }
    else if(e.target.name =='testdescription'){
        setTestDescription(e.target.value);
    }
    else if(e.target.name =='time'){
        setTime(e.target.value);
        setActualTestDate(testdate+'T'+time+':00');
    }  
    else if(e.target.name =='testbenefits'){
        setTestBChild(e.target.value);
    }
}
//add test states end here
//test benefits pushing into array start here
const handleTestBenefits = () => {
    setTestBenefits([...testbenefits,testbchild]);
    setTestBChild('');
}
const handleRemoveTestBenefits = (index) => {
    const newTestBenefits = [...testbenefits];
    newTestBenefits.splice(index,1);
    setTestBenefits(newTestBenefits);
}
//addevent states end here
const handleAddEvent =async()=>{
    setActualTestDate(testdate+'T'+time+':00');
    setLoading(true);
    let data = {testname,testtype:testype,testdate:actualTestDate,time,testtitle,testdescription,testbenefits,status:"addTest"};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setLoading(false);
    if(result.success){
      toast.success(result.message);
      setTestName('');
      setTestType('');
      setTestDate('');
      setTime('');
      setTestTitle('');
      setTestDescription('');
      setTestBenefits([]);
      setActualTestDate('');
      setTestBChild('');
      handleClose();
    }
    else{
      toast.error(result.message);
    }
}
//delete test start here
const handleDeleteTest = async(id)=>{
    setLoading(true);
    let a = confirm("Are you sure you want to delete this test?");
    if(!a){
        setLoading(false);
        return;
    }
    else{
        let data = {status:"deleteTest",id};
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        setLoading(false);
        if(result.success){
          toast.success(result.message);
          fetchAllTests();
        }
        else{
          toast.error(result.message);
        }
    }
    
}
//delete test end here
//updateStarts Here
const update =(item)=>{
   setTestUpdate(true);
    setTestName(item.testname);
    setTestType(item.testtype);
    setTestDate(item.testdate.slice(0,10));
    setTime(item.testdate.slice(11,16));
    setTestTitle(item.testtitle);
    setTestDescription(item.testdescription);
    setTestBenefits(item.testbenefits);
    setActualTestDate(item.testdate);
    setId(item._id);
    handleOpen();
}
const handleUpdateTest = async()=>{
    setActualTestDate(testdate+'T'+time+':00');
    setLoading(true);
    let data = {testname,testtype:testype,testdate:actualTestDate,time,testtitle,testdescription,testbenefits,status:"updateTest",id};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testopt`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    console.log(result);
    setLoading(false);
    if(result.success){
      toast.success(result.message);
      setTestName('');
      setTestType('');
      setTestDate('');
      setTime('');
      setTestTitle('');
      setTestDescription('');
      setTestBenefits([]);
      setTestBChild('');
      setActualTestDate('');
      setId('');
     fetchAllTests();
      handleClose();
    }
    else{
      toast.error(result.message);
    }
}
  return (
      <ThemeProvider theme={theme}>
       <FullLayout>
       <Toaster position="top-center"/>
       <style jsx global>{`
          #footer {
            display: none;
          }
          #navbar {
            display: none;
          }
        `}</style>
         <Head>
            <title>Admin | Add Test and mange all the tests</title>
            <meta name="description" content="Admin | Add Test and mange all the tests" />
            </Head>
           {loading?<div className='min-h-screen flex justify-center items-center'><Spinner/></div>:<>
        <section>
        <>
  {/* Table Section */}
  <div className="max-w-[85rem] px-4 py-4 sm:px-6 lg:px-8 lg:py-4 mx-auto">
    {/* Card */}
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
            {/* Header */}
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 navfont">
                    All Tests - Manage all the tests
                </h2>
              </div>
              <div>
                <div className="inline-flex gap-x-2">
               
                  <a
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href="#"
                  >
                    View all
                  </a>
                  <button
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={handleOpen}
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5v14" />
                    </svg>
                    Create
                  </button>
                </div>
              </div>
            </div>
            {/* End Header */}
            {/* Table */}
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-slate-900">
                <tr>
                 
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Test Name
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Test Type
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Test Date
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                      Test Time
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-start">
                    <div className="flex items-center gap-x-2">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                        Test Status
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                
                
                
                {testData&&testData.map((item)=>(<tr key={item._id}>
                  
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <div className="flex items-center gap-x-2">
                       
                        <div className="grow">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {item.testname}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.testtype}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                       {item.testdate.slice(0,10)}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.testdate.slice(11,16)}
                      </span>
                    </div>
                  </td>
                  <td className="size-px whitespace-nowrap">
                    <div className="px-6 py-2 flex gap-x-1">
                     <button className='px-2 py-2 bg-green-600 mx-2 my-2 text-sm navfont text-white rounded'
                    onClick={()=>{update(item)}}
                     >
                        Update
                     </button>
                        <button className='px-2 py-2 bg-red-600 mx-2 my-2 text-sm navfont text-white rounded'
                         onClick={()=>{handleDeleteTest(item._id)}}
                        >
                            Delete
                        </button>
                    </div>
                  </td>
                </tr>))}
               
                
              </tbody>
            </table>
            {/* End Table */}
            {/* Footer */}
            <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center gap-x-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing:
                </p>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                 {testData.length} of {testData.length}
                </p>
              </div>
              <div>
                <div className="inline-flex gap-x-2">
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Prev
                  </button>
                  <button
                    type="button"
                    className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Next
                    <svg
                      className="flex-shrink-0 size-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* End Footer */}
          </div>
        </div>
      </div>
    </div>
    {/* End Card */}
  </div>
  {/* End Table Section */}
</>
<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handleClose}>
    <IoMdCloseCircle className='text-4xl'/>
    </div>
    <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto overflow-scroll max-h-[80vh]">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-stone-700 text-xl font-bold">
                Add a New Test
              </h2>
              <p className="mt-1 text-sm">
              Add a new test to the list
              </p>
              <div className="mt-8">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Test Name
                  </label>
                  <input
                    id="status"
                    name="testname"
                    type="text"
                    value={testname}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                   Test Date
                  </label>
                  <input
                    id="status"
                    name="testdate"
                    value={testdate}
                    type="date"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                  />
                   
                </div>
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                   Test Time
                  </label>
                  <input
                    id="status"
                    name="time"
                    value={time}
                    type="time"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                  />
                   
                </div>
                
                
                <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Test Type
                  </label>
                  <select
                    id="status"
                    name="testtype"
                    value={testype}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                    
                  >
                    <option>Select</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>

                </div>
              </div>
              <div className="mt-8 ">
               <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Test Title for About
                  </label>
                  <input
                    id="status"
                    name="testtitle"
                    type="text"
                    value={testtitle}
                    onChange={handleChange}
                  
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                    
                  />
                   
                  
                </div>
                <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Test Benefits
                  </label>
                <div className="flex ">
                 
                  <input
                    id="status"
                    name="testbenefits"
                    type="text"
                    value={testbchild}
                    onChange={handleChange}
                  
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                    
                  />
                   
                <button className='px-2 py-2 bg-green-600 mx-2 my-2 text-sm navfont text-white rounded w-28 ' onClick={handleTestBenefits}>
                    Add
                </button>
               
                </div>
                {testbenefits.map((item,index)=>(
                    <ul key={index} className='bg-green-200 rounded p-4 my-2 flex items-center justify-between'>
                        <li className='navfont'>{item}</li>
                        <IoCloseSharp className='text-xl text-black ' onClick={()=>{handleRemoveTestBenefits(index)}}/>
                    </ul>
                ))}
                
               
                
              </div>
             
              <div className="mt-8 ">
             
             
              
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                 Event Description
                  </label>
                  <textarea
                    id="status"
                    name="testdescription"
                    onChange={handleChange}
                    value={testdescription}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows="3"
                    cols="10"
                  >
                    </textarea>
                
                  
                </div>
                
              </div>
              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90 navfont"
                  onClick={handleClose}
                >
                  Cancel
                </button>
               { !testUpdate&&<button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                onClick={handleAddEvent}
                  
                >
                  Add Event
                </button>}
                { testUpdate&&<button
                  className="active:scale-95 rounded-lg bg-green-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                onClick={handleUpdateTest}
                  
                >
                  Update Event
                </button>}
              </div>
            </div>
          </div>
  </Box>
</Modal>
        </section>
        </>} 
       </FullLayout>
      </ThemeProvider> 
 
  )
}

export default Myaccount
