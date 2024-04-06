import React, { useEffect, useState } from 'react'
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { saveAs } from 'file-saver';
const excel = require("exceljs");
import Head from 'next/head';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdCloseCircle } from "react-icons/io";
import Spinner from '../components/Spinner';
import toast, { Toaster } from "react-hot-toast";
import { set } from 'mongoose';
const Myaccount = () => {
  //modal starts from here
  const [width,setWidth]= useState(0);
    const [open, setOpen] = useState(false);
    const [question1,setQuestion1]=useState([]);
    const [question2,setQuestion2]=useState([]);
    const [question3, setQuestion3] = useState([]);
    const [question4, setQuestion4] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        useEffect(()=>{
          var w = window.innerWidth;
         if(w>=500){
          setWidth(800);
         }
         else{
          setWidth(350);
         }
          
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
    // State to store all the data
    const [data, setData] = useState([]);
    const [ticketstatus, setTicketstatus] = useState("");
    const [searchquery, setSearchquery] = useState("");
    const [testQuestion,SetTestQuestion]=useState([]);
    const [count, setCount] = useState(6);
    const [intialcount, setIntialcount] = useState(0);
    const [isSearch, setIsSearch] = useState(false);
    const [searcharray, setSearcharray] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [testname, setTestname] = useState("");
    const [testid, setTestid] = useState("");
    const [status, setStatus] = useState("");
    const [score, setScore] = useState("");
    const [scorestatus, setScorestatus] = useState("");
    const [selected,setSelected]=useState("");
    const [linkedin,setLinkedin]=useState("");
    const [github,setGithub]=useState("");
    const [clg,setClg]=useState("");
    const [answer1,setAnswer1]=useState([{0:"HELLO"}]);
    const [answer2,setAnswer2]=useState([{0:"HELLO"}]);
    const [answer3,setAnswer3]=useState([{0:"HELLO"}]);
    const [answer4,setAnswer4]=useState([{0:"HELLO"}]);
    const [loading, setLoading] = useState(false);
    const [imgarr, setImgarr] = useState([]);
    const [id,setId]=useState("");
    const [imgintial,setImgintial]=useState(2);
    // Fetching all data from the database
    const fetchalldata = async () => {
      setLoading(true);
       const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/Test/testreg`);
       const data = await res.json();
        setLoading(false);
         setData(data.data);
     }
     const fetchtestquestion = async () => {
      setLoading(true);
      let data = { status: "getone"};
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/Test/testquestion`,
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
      if (result.success) {
        SetTestQuestion(result.data[0]);
        setQuestion1(result.data[0].question1);
        setQuestion2(result.data[0].question2);
        setQuestion3(result.data[0].question3);
        setQuestion4(result.data[0].question4);
      }
      else{
       toast.error(result.message);
      }
     }
    //USEeFFECT 
    useEffect(() => {
      fetchalldata();
      fetchtestquestion();
    }, [])
//HANDLE CHANGE
const handleChange = (e) => {
    if(e.target.name=="search"){
      setSearchquery(e.target.value)
      if (e.target.value.length > 0) {
        setIsSearch(true);
      }
      if (e.target.value.length == 0) {
        setIsSearch(false);
      }
      const res = data.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearcharray(res);
    }
    else if(e.target.name=="name"){
      setName(e.target.value);
    }
    else if(e.target.name=="email"){
      setEmail(e.target.value);
    }
    else if(e.target.name=="phone"){
      setPhone(e.target.value);
    }
    else if(e.target.name=="testname"){
      setTestname(e.target.value);
    }
    else if(e.target.name=="testid"){
      setTestid(e.target.value);
    }
    else if(e.target.name=="status"){
      setStatus(e.target.value);
    }
    else if(e.target.name=="score"){
      setScore(e.target.value);
    }
    else if(e.target.name=="scorestatus"){
      setScorestatus(e.target.value);
    }
    else if(e.target.name=="linkedin"){
      setLinkedin(e.target.value);
    }
    else if(e.target.name=="github"){
      setGithub(e.target.value);
    }
    else if(e.target.name=="clg"){
      setClg(e.target.value);
    }
    else if(e.target.name=="selected"){
      setSelected(e.target.value);
    }

  };
  //EXPORT EXCEL
  const exportexcel= async()=>{
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("UsersData");
    worksheet.columns = [
        { header: "id", key: "id", width: 30 },
        { header: "Name", key: "name", width: 30 },
        { header: "Email", key: "email", width: 30 },
        { header: "Phone", key: "phone", width: 30 },
        { header: "Test Name", key: "testname", width: 30 },
        { header: "Test id", key: "testid", width: 30 },
        { header: "Status", key: "status", width: 30 },
        { header: "Score", key: "score", width: 30 },
        { header: "Score Status", key: "scorestatus", width: 30 },
        
    ];
    data.map((item)=>{
        worksheet.addRow({
            id:item._id,
            name:item.name,
            email:item.email,
            phone:item.phone,
            testname:item.testname,
            testid:item.testid,
            status:item.status,
            score:item.score,
            scorestatus:item.scorestatus,
        });
    })
    worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
    });
    const buf = await workbook.xlsx.writeBuffer()
  
    saveAs(new Blob([buf]), 'Testregdetails.xlsx')
   }
    const scoreChecker = ()=>{
      let totalscore  =0;
      question1.map((item,index)=>{
        if(item.answer==answer1[0][index]){
          console.log("Correct Answer");
          totalscore++;
        }
        else{
          console.log("Wrong Answer");
        }
      });
      question2.map((item,index)=>{
        if(item.answer==answer2[0][index]){
          console.log("Correct Answer");
          totalscore++;
        }
        else{
          console.log("Wrong Answer");
        }
      });
      setScore(totalscore);
    }
   const update = (item)=>{
   setName(item.name);
    setEmail(item.email);
    setPhone(item.phone);
    setTestname(item.testname);
    setTestid(item.testid);
    setStatus(item.status);
    setScore(item.score);
    setScorestatus(item.scorestatus);
    setLinkedin(item.linkedin);
    setGithub(item.github);
    setClg(item.clg);
    setAnswer1(item.question1answer);
    setAnswer2(item.question2answer);
    setAnswer3(item.question3answer);
    setAnswer4(item.question4answer);
    setSelected(item.selected);
    setImgarr(item.imgarr);
    setId(item._id);
    handleOpen();
   }
const updateTestResult = async()=>{
  setLoading(true);
  if(selected=="selected"){
    let data = { status: "selected",id:id,score:score,scorestatus:scorestatus,selected:selected,email:email,statuses:status};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testresult`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setLoading(false);
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      fetchalldata();
      handleClose();
    } else {
      toast.error(result.message);
    }
  }
  else if(selected=="rejected"){
    let data = { status: "rejected",id:id,score:score,scorestatus:scorestatus,selected:selected,email:email,statuses:status};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testresult`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setLoading(false);
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      fetchalldata();
      handleClose();
    } else {
      toast.error(result.message);
    }
  }
  else{
    let data = { status: "checked",id:id,score:score,scorestatus:scorestatus,email:email,statuses:status};
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/Test/testresult`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    setLoading(false);
    const result = await res.json();
    if (result.success) {
      toast.success(result.message);
      fetchalldata();
      handleClose();
    } else {
      toast.error(result.message);
    }
  }
}

  return (
      <ThemeProvider theme={theme}>
       <FullLayout>
       <style jsx global>{`
          #footer {
            display: none;
          }
          #navbar {
            display: none;
          }
        `}</style>
      <Head>
        <title>Test Result | Mange your users test result and registration</title>
        <meta name="description" content="Test Result | Mange your users test result and registration" />
      </Head>
      <Toaster position="top-center" />
      {loading?<div className='min-h-screen flex justify-center items-center'><Spinner/></div>:<>
       <>
        {/* Table Section */}
        <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8  mx-auto">
              {/* Card */}
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                      {/* Header */}
                      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <h2 className="text-xl font-semibold text-black dark:text-gray-200 navfont">
                            Tests User Data
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            List of all tests user data with filters and
                            actions.
                          </p>
                        </div>
                        <div>
                        <input
                          type="text"
                          className="p-2 border-2 border-gray-300 rounded-lg w-96"
                          placeholder="Search for Name"
                          onChange={handleChange}
                          name="search"
                          aria-autocomplete="none"
                          value={searchquery}
                        />
                      </div>
                        <div>
                          
                          <div className="inline-flex gap-x-2">
                            <button
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              onClick={()=>{
                                  setCount(data.length);
                                  setIntialcount(0);
                              }}
                            >
                              View all
                            </button>
                            <button
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              onClick={exportexcel}
                            >
                             
                              Export to Excel
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* End Header */}
                      {/* Table */}
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-slate-900">
                          <tr>
                            <th
                              scope="col"
                              className="ps-6 py-3 text-start"
                            ></th>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                  Name
                                </span>
                              </div>
                            </th>
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
                                  Status
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                  Score Status
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                  Score
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-end" />
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                          {!isSearch&&data.slice(intialcount,count).map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-2">
                                   
                                    <div className="grow">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.testname}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.status}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.scorestatus == "checked" ? (
                                    <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                      <svg
                                        className="w-2.5 h-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      {item.scorestatus}
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                      <svg
                                        className="w-2.5 h-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                      </svg>
                                        {item.scorestatus}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.score}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-1.5">
                                  <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                    <button
                                      id=""
                                      type="button"
                                      className="py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                      onClick={()=>{update(item)}}
                                    >
                                      <svg
                                        className="flex-shrink-0 w-4 h-4"
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
                                        <circle cx={12} cy={12} r={1} />
                                        <circle cx={19} cy={12} r={1} />
                                        <circle cx={5} cy={12} r={1} />
                                      </svg>
                                    </button>
                                    <div className="transition-[opacity,margin] duration  hidden  divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700">
                                      {/* <div className="py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Rename
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Regenrate Key
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Disable
                            </a>
                          </div>
                          <div className="py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700"
                              href="#"
                            >
                              Delete
                            </a>
                          </div> */}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {/* {if searchhappens} */}
                          {isSearch&&searcharray.map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.name}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-2">
                                   
                                    <div className="grow">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.testname}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.status}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.scorestatus == "checked" ? (
                                    <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                                      <svg
                                        className="w-2.5 h-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                      </svg>
                                      
                                        {item.scorestatus}
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-green-200">
                                      <svg
                                        className="w-2.5 h-2.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                      >
                                        <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                      </svg>
                                     {item.scorestatus}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                   {item.score}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-1.5">
                                  <div className="hs-dropdown relative inline-block [--placement:bottom-right]">
                                    <button
                                      id=""
                                      type="button"
                                      className="py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
                                      onClick={handleOpen}
                                    >
                                      <svg
                                        className="flex-shrink-0 w-4 h-4"
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
                                        <circle cx={12} cy={12} r={1} />
                                        <circle cx={19} cy={12} r={1} />
                                        <circle cx={5} cy={12} r={1} />
                                      </svg>
                                      
                                    </button>
                                    <div className="transition-[opacity,margin] duration  hidden  divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700">
                                      {/* <div className="py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Rename
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Regenrate Key
                            </a>
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              Disable
                            </a>
                          </div>
                          <div className="py-2 first:pt-0 last:pb-0">
                            <a
                              className="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-red-500 dark:hover:bg-gray-700"
                              href="#"
                            >
                              Delete
                            </a>
                          </div> */}
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {/* End Table */}
                      {/* Footer */}
                      <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-gray-700">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">
                              {data.length}
                            </span>{" "}
                            results
                          </p>
                        </div>
                        <div>
                          <div className="inline-flex gap-x-2">
                            <button
                              type="button"
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              onClick={() => {
                                if (intialcount > 0) {
                                  setIntialcount(intialcount - 6);
                                  setCount(count - 6);
                                }
                              }}
                               
                            >
                              <svg
                                className="flex-shrink-0 w-4 h-4"
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
                              onClick={() => {
                                if (count < data.length) {
                                  setIntialcount(count);
                                  setCount(count + 6);
                                }
                                else if(count < searcharray.length){
                                  setIntialcount(count);
                                  setCount(count + 6);
                                }
                              }}
                            >
                              Next
                              <svg
                                className="flex-shrink-0 w-4 h-4"
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
                        Result Details
                      </h2>
                      <p className="mt-1 text-sm">Result - Add, Modify,Delete , Hire etc.</p>
                      <div className="mt-8">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            User Name
                          </label>
                          <input
                            id="status"
                            name="name"
                            type="text"
                            value={name}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            User Email
                          </label>
                          <input
                            id="status"
                            name="email"
                            value={email}
                            type="email"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Test Name
                          </label>
                          <input
                            id="status"
                            name="testname"
                            value={testname}
                            type="text"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            User LinkedIn
                          </label>
                          <input
                            id="status"
                            name="linkedin"
                            value={linkedin}
                            type="text"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                            onDoubleClick={()=>{window.open(linkedin,'_blank')}}
                            
                          />
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            User GitHub
                          </label>
                          <input
                            id="status"
                            name="github"
                            value={github}
                            type="text"
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                            onDoubleClick={()=>{window.open(github,'_blank')}}
                           
                          />
                        </div>

                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                           Status
                          </label>
                          <select
                            id="status"
                            name="status"
                            value={status}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            <option value="registered">Registered</option>
                            <option value="submitted">Submitted</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                           Score Status
                          </label>
                          <select
                            id="status"
                            name="scorestatus"
                            value={scorestatus}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            <option value="not checked">Not Checked</option>
                            <option value="checked">Checked </option>
                            <option value="mp">MalPractice(MP)</option>
                          </select>
                        </div>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                           Selection Status
                          </label>
                          <select
                            id="status"
                            name="selected"
                            value={selected}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 "
                          >
                            <option>Select</option>
                            <option value="pending">Pending</option>
                            <option value="selected">Selected</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </div>
                      </div>
                      {status!="registered"&&<div>
                      <div className="mt-8 ">
                        <div className="flex flex-col">
                          <label
                            htmlFor="status"
                            className="text-stone-600 text-sm font-medium"
                          >
                            Total Score
                          </label>
                          <input
                            id="status"
                            name="score"
                            type="text"
                            value={score}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 my-2"
                          />
                          <button className='p-4 m-2 navfont bg-green-600 text-white rounded' onClick={scoreChecker}>
                            Get Mcq Score
                          </button>
                        </div>
                       
                       
                      </div>

                      <div className="mt-8 ">
                        <h1 className='font-bold navfont p-4 text-xl'>Round 3 answer</h1>
                        {question3.map((item,index)=>(<div className="flex flex-col" key={index}>
                          <label
                            htmlFor="status"
                            className="text-black font-bold text-sm navfont text-lg"
                          >
                            Q{index+1}. {item.question}
                          </label>
                          <textarea
                            id="status"
                            name="question3"
                            onChange={handleChange}
                            value={answer3[0][index]}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            rows="10"
                            cols="30"
                          ></textarea>
                        </div>))}
                      </div>
                      <div className="mt-8 ">
                        <h1 className='font-bold navfont p-4 text-xl'>Round 4 answer</h1>
                        {question4.map((item,index)=>(<div className="flex flex-col" key={index}>
                          <label
                            htmlFor="status"
                            className="text-black font-bold navfont text-lg"
                          >
                            Q{index+1}. {item.question}
                          </label>
                          <textarea
                            id="status"
                            name="question4"
                            onChange={handleChange}
                            value={answer4[0][index]}
                            className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            rows="10"
                            cols="30"
                          ></textarea>
                        </div>))}
                      </div>
                      <div className='mt-4 flex flex-wrap flex-row'>
                       <h1 className='font-bold navfont'>Photos During the test</h1>
                       {imgarr.slice(0,imgintial).map((item,index)=>(<div className='m-2' key={item}>
                       <img src={item} alt="img" className="rounded h-40 w-40 hover:w-52 hover:h-52 transition-all duration-300 ease-in-out"/>

                       </div>))}
                      
                      </div>
                      <button className='p-2 m-2 navfont bg-green-600 text-white rounded ' onClick={()=>{
                        if(imgintial<imgarr.length){
                          setImgintial(imgintial+2)
                        }
                       }}>
                            Load More
                          </button>

                          <button className='p-2 m-2 navfont bg-purple-600 text-white rounded ' onClick={()=>{
                            setImgintial(imgarr.length);
                          }}>
                           Load All 
                          </button>
                          <button className='p-2 m-2 navfont bg-red-600 text-white rounded ' onClick={()=>{
                            setImgintial(2);
                          }}>
                            Reset
                          </button>
                      <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                        <button
                          className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90 navfont"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                  
                          <button
                            className="active:scale-95 rounded-lg bg-green-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90 navfont"
                          onClick={updateTestResult}
                          >
                            Update Result
                          </button>
                         
                    
                      </div>
                      </div>}
                    </div>
                  </div>

  </Box>
</Modal>
</>}
       </FullLayout>
      </ThemeProvider> 
 
  )
}

export default Myaccount
