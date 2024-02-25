import React from "react";
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdCloseCircle } from "react-icons/io";
import { ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import toast,{Toaster} from "react-hot-toast";
const excel = require("exceljs");
import { saveAs } from 'file-saver'
import Spinner from "../components/Spinner";
import Head from "next/head";

const AddEvent = () => {
  const [tabledata, setTabledata] = useState([]);
  const [searcharray, setSearcharray] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const [intialcount, setIntialcount] = useState(0);
  const [count, setCount] = useState(6);
  const [open, setOpen] = useState(false);
  const [width,setWidth]= useState(0);
  const [name, setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [github,setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [title, setTitle] = useState("");
  const [teamimg, setTeamimg] = useState("");
  const [img, setImg] = useState("");
 const [loading, setLoading] = useState(false);
 const [openu, setOpenu] = useState(false);
 const [cardview,setCardview] = useState(false);
 const [position,setPosition] = useState("");
 const [id, setId] = useState("");

  const fetchevent = async () => {
    setLoading(true);
    const data = { status: "getall" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();

    setTabledata(result.data);
    setLoading(false)
  };
  useEffect(() => {
    fetchevent();
    var w = window.innerWidth;
          setWidth(w-10);
         if(w>=995){
          setWidth(1000);
         }
         else if(w<=994){
          setWidth(w-10);
         }
         else{
          setWidth(w-10);
         }
  }, []);

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
  const handleChange = (e) => {
    if (e.target.name == "search") {
        setSearchquery(e.target.value)
        if (e.target.value.length > 0) {
          setIsSearch(true);
        }
        if (e.target.value.length == 0) {
          setIsSearch(false);
        }
        const res = tabledata.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearcharray(res)
    }

    else if (e.target.name=="img"){
      setImg(e.target.files[0]);
     }
   if(e.target.name=="name"){
     setName(e.target.value);
   }
    if(e.target.name=="email"){
      setEmail(e.target.value);
    }
    if(e.target.name=="phone"){
      setPhone(e.target.value);
    }
    if(e.target.name=="desc"){
      setDesc(e.target.value);
    }
    if(e.target.name=="github"){
      setGithub(e.target.value);
    }
    if(e.target.name=="linkedin"){
      setLinkedin(e.target.value);
    }
    if(e.target.name=="twitter"){
      setTwitter(e.target.value);
    }
    if(e.target.name=="title"){
      setTitle(e.target.value);
    }
    if(e.target.name=="teamimg"){
      setTeamimg(e.target.value);
    }
    if(e.target.name=="position"){
      setPosition(e.target.value);
    }

  };
 
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpenu = () => {
        setOpenu(true);
    }
    const handleCloseu = () => {
        setOpenu(false);
    }
    const exportexcel= async()=>{
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("EventsData");
        worksheet.columns = [
            { header: "Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 30 },
            { header: "Phone", key: "phone", width: 30 },
            { header: "Linkedin", key: "linkedin", width: 30 },
            { header: "Github", key: "github", width: 30 },
            { header: "Title", key: "title", width: 30 },
            { header: "Position", key: "position", width: 30 },
            { header: "Image", key: "image", width: 30 },
            { header: "Description", key: "description", width: 50 },
        ];
        tabledata.map((item)=>{
            worksheet.addRow({
                name: item.name,
                email: item.email,
                phone: item.phone,
                linkedin: item.linkedin,
                github: item.github,
                title: item.title,
                position: item.position,
                image: item.img,
                description: item.desc,
            });
        })
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        const buf = await workbook.xlsx.writeBuffer()
      
        saveAs(new Blob([buf]), 'TeamDetails.xlsx')
       }

       const uploadImage = () => {
        setLoading(true);
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", "uuaob1ay");
        data.append("cloud_name", "dst73auvn");
        fetch("https://api.cloudinary.com/v1_1/dst73auvn/image/upload", {
          method: "post",
          body: data,
        })
          .then((resp) => resp.json())
          .then((data) => {
            setTeamimg(data.url);
            setLoading(false);
            toast.success("Image uploaded successfully");
            setImg("");
            
          }).catch((err) => {
            setLoading(false);
            toast.error("Error while uploading image");
          });
      };
//add event function
      const handleAddTeam = async () => {
        
        if(name=="" && teamimg=="" ){
          toast.error("Please fill all the fields")
        }
//else 
        else{
          setLoading(true)
        const data = { status: "addteam",name, email, phone, desc, github, linkedin, twitter, title, img:teamimg, position};
        //fetch api
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
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
      if(result.success){
        toast.success(result.message)
        fetchevent();
        handleClose();
        setName("");
        setEmail("");
        setPhone("");
        setDesc("");
        setGithub("");
        setLinkedin("");
        setTwitter("");
        setTitle("");
        setTeamimg("");
        setPosition("");
      }
      else{
        toast.error(result.message)
      }
    }

      };
      //delete event function
      const handleUpdateTeam = async () => {
        setLoading(true)
        const data = { status: "updateteam" ,name, email, phone, desc, github, linkedin, twitter, title, img:teamimg, position,id};
        console.log(data);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
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
          toast.success(result.message)
          fetchevent();
          handleCloseu();
        }
        else{
          toast.error(result.message)
          
        }
      }

      const handleDeleteTeam = async () => {
        let a  = confirm("Are you sure you want to delete this event?");
        if(a){
          setLoading(true)
          const data = { status: "delete" ,id};
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addteam`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const result = await res.json();
          setLoading(false)
          if(result.success){
            toast.success(result.message)
            fetchevent();
            handleCloseu();
          }
          else{
            toast.error(result.message)

          }
        }
      }
      
  return (
    <ThemeProvider theme={theme}>
      <FullLayout>
        <Head>
          <title>Admin | Add Team Member</title>
        </Head>
        <Toaster position="top-center"/>
        {loading?<div className="flex justify-center items-center my-52"><Spinner/></div>:<>        
        <style jsx global>{`
          #footer {
            display: none;
          }
          #navbar {
            display: none;
          }
        `}</style>
        <>
          <div className="max-w-[85rem] px-4 py-2 sm:px-6 lg:px-8  mx-auto">
            {/* Card */}
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                    {/* Header */}
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          Add Team Member
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add a new team member to the website.
                        </p>
                      </div>
                      <div>
                        <input
                          type="search"
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
                            onClick={() => {
                              setCount(tabledata.length);
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
                          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 " onClick={handleOpen}>
                            + Create
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* End Header */}
                    {/* Table */}
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-slate-900">
                        <tr>
                          <th scope="col" className="ps-6 py-3 text-start"></th>
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
                                Email
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Title
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Position
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Created Date
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-end" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {!isSearch &&
                          tabledata&&tabledata.slice(intialcount, count).map((item) => (
                            <tr key={item._id}>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="ps-6 py-3"></div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <div className="flex items-center gap-x-2">
                                  <img
                                    className="inline-block h-6 w-6 rounded-full"
                                    src={`${item.img}`}
                                    alt="Image Description"
                                  />
                                  <div className="grow">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                      {item.name}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.email}
                                </span>
                              </div>
                            </td>

                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                {item.title}
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                            <div className="px-6 py-3">
                                {item.position}
                              </div>
                            </td>
                            <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleDateString("en-IN", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
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
                                    onClick={()=>{
                                      handleOpenu();
                                      setName(item.name);
                                      setEmail(item.email);
                                      setPhone(item.phone);
                                      setDesc(item.desc);
                                      setGithub(item.github);
                                      setLinkedin(item.linkedin);
                                      setTwitter(item.twitter);
                                      setTitle(item.title);
                                      setTeamimg(item.img);
                                      setPosition(item.position);
                                      setId(item._id);

                                      
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
                                      <circle cx={12} cy={12} r={1} />
                                      <circle cx={19} cy={12} r={1} />
                                      <circle cx={5} cy={12} r={1} />
                                    </svg>
                                  </button>
                                  <div className="transition-[opacity,margin] duration  hidden  divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700">
                                    
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          ))}
                        {/* {if searchhappens} */}
                        {isSearch &&
                          searcharray.map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="inline-block h-6 w-6 rounded-full"
                                      src={`${item.img}`}
                                      alt="Image Description"
                                    />
                                    <div className="grow">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.name}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.email}
                                  </span>
                                </div>
                              </td>

                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.title}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                              <div className="px-6 py-3">
                                  {item.position}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString("en-IN", {
                                      weekday: "long",
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    })}
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
                                      onClick={()=>{
                                        handleOpenu();
                                        setName(item.name);
                                        setEmail(item.email);
                                        setPhone(item.phone);
                                        setDesc(item.desc);
                                        setGithub(item.github);
                                        setLinkedin(item.linkedin);
                                        setTwitter(item.twitter);
                                        setTitle(item.title);
                                        setTeamimg(item.img);
                                        setPosition(item.position);
                                        setId(item._id);

                                        
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
                                        <circle cx={12} cy={12} r={1} />
                                        <circle cx={19} cy={12} r={1} />
                                        <circle cx={5} cy={12} r={1} />
                                      </svg>
                                    </button>
                                    <div className="transition-[opacity,margin] duration  hidden  divide-y divide-gray-200 min-w-[10rem] z-10 bg-white shadow-2xl rounded-lg p-2 mt-2 dark:divide-gray-700 dark:bg-gray-800 dark:border dark:border-gray-700">
                                      
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
                            {tabledata&&tabledata.length}
                          </span>{" "}
                          results
                        </p>
                      </div>
                      <div>
                        <div className="inline-flex gap-x-2 flex justify-center items-center">
                          <label htmlFor="cardview" className="navfont ">Card View
                        <input
                            type="checkbox"
                            id="cardview"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 navfont mx-4 bg-blue-600 h-4 w-4"
                            onChange={(e)=>{
                             setCardview(e.target.checked)
                            }}
                            />
                            </label>
                          <button
                            type="button"
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={() => {
                              if (intialcount > 0) {
                                setIntialcount(intialcount -6);
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
                              if (count < tabledata.length) {
                                setIntialcount(count);
                                setCount(count + 6);
                              } else if (count < searcharray.length) {
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
        {
          cardview&&<section className="items-center bg-gray-100 lg:flex ln font-poppins dark:bg-gray-900 ">
          <div className="justify-center max-w-6xl px-4 py-4 mx-auto lg:py-0">
            <div  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2">
            {tabledata.map((item)=>( <div key={item._id} className="p-4 bg-white rounded dark:bg-gray-800">
              <div className="relative w-full h-40 mb-2">
                  <img
                    src={`${item.img}`}
                    alt=""
                    className="object-cover w-full h-full rounded"
                  />
                  <span className="absolute top-0 right-0 px-2 py-1 mt-2 mr-2 text-xs text-white bg-yellow-600">
                   {item.title}
                  </span>
                  
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold dark:text-gray-300">
                     {item.name}
                    </h2>
                  </div>
                  <div className="text-base font-semibold text-green-600">{item.position.toUpperCase()}</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-medium dark:text-gray-400">
                    Email
                  </h2>
                  <span className="inline-block px-2 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-700 dark:text-blue-400 bg-blue-50">
                    {item.email}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-medium dark:text-gray-400">Title</h2>
                  <span className="inline-block px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                 {item.title}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-medium dark:text-gray-400">
                   Event Desc
                  </h2>
                  <span className="inline-block px-2 py-1 text-xs text-blue-500 rounded-full bg-blue-50 dark:bg-gray-700 dark:text-blue-400">
                    {item.desc}
                  </span>
                </div>
               <div className="flex justify-between">

               
                <button
            className="px-3 py-2 text-xs text-white bg-blue-800 rounded hover:bg-blue-600 w-32"
            onClick={()=>{
              setName(item.name);
              setEmail(item.email);
              setPhone(item.phone);
              setDesc(item.desc);
              setGithub(item.github);
              setLinkedin(item.linkedin);
              setTwitter(item.twitter);
              setTitle(item.title);
              setTeamimg(item.img);
              setPosition(item.position);
              setId(item._id);

              handleOpenu();
            }}
          >
            Update Team
          </button>
          <button
            
            className="px-3 py-2 text-xs text-white bg-red-800 rounded hover:bg-blue-600 mx-4 w-32"
            onClick={()=>{
              setId(item._id);
              handleDeleteTeam();
            }}
          >
            Delete Team
          </button>
          </div>
              </div>))}
              </div>

          </div>
        </section>
        
        }

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
                Add a New Team Member
              </h2>
              <p className="mt-1 text-sm">
                Please fill the following details to add a new team member.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Name
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
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="status"
                    name="email"
                    value={email}
                    type="emiail"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                   
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="status"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    type="number"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Title
                  </label>
                  <input
                    id="status"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleChange}
                  
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                   
                  
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Github
                  </label>
                  <input
                    id="status"
                    name="github"
                    type="url"
                    value={github}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                
                  
                </div>
                
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Linkedin
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="linkedin"
                    value={linkedin}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Twitter
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="twitter"
                    onChange={handleChange}
                    value={twitter}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Position
                  </label>
                  <select
                    id="status"
                    name="position"
                    value={position}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  >
                    <option>Select</option>
                    <option value="lead">InnovateU Lead</option>
                    <option value="manager">Community Manager</option>
                    <option value="member">Community Members</option>
                  </select>

                </div>
                
                
               
               
              </div>
              <div className="mt-8 ">
            
              <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Team Member Image
                  </label>
                  <input
                    id="status"
                    name="img"
                    onChange={handleChange}
                   
                    type="file"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                     <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={uploadImage}
                  
                >
                  Upload Image
                </button>
                  {
                    teamimg&& <img src={teamimg} alt="img" className="w-52 h-52 my-2 "/>
                  }
                </div>
              
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                 About Team Member
                  </label>
                  <textarea
                    id="status"
                    name="desc"
                    onChange={handleChange}
                    value={desc}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows="3"
                    cols="10"
                  >
                    </textarea>
                
                  
                </div>
                
              </div>
              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={handleAddTeam}
                  
                >
                  Add Team Member
                </button>
              </div>
            </div>
          </div>
  </Box>
</Modal>
<Modal
  open={openu}
  onClose={handleCloseu}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handleCloseu}>
    <IoMdCloseCircle className='text-4xl'/>
    </div>
  <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto overflow-scroll max-h-[80vh]">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-stone-700 text-xl font-bold">
               Update Team Member
              </h2>
              <p className="mt-1 text-sm">
                Please fill the following details to update the team member.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Name
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
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="status"
                    name="email"
                    value={email}
                    type="emiail"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                   
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Phone
                  </label>
                  <input
                    id="status"
                    name="phone"
                    value={phone}
                    onChange={handleChange}
                    type="number"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Title
                  </label>
                  <input
                    id="status"
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleChange}
                  
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                   
                  
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Github
                  </label>
                  <input
                    id="status"
                    name="github"
                    type="url"
                    value={github}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                
                  
                </div>
                
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Linkedin
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="linkedin"
                    value={linkedin}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Twitter
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="twitter"
                    onChange={handleChange}
                    value={twitter}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Position
                  </label>
                  <select
                    id="status"
                    name="position"
                    value={position}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  >
                    <option>Select</option>
                    <option value="lead">InnovateU Lead</option>
                    <option value="manager">Community Manager</option>
                    <option value="member">Community Members</option>
                  </select>

                </div>
                
                
               
               
              </div>
              <div className="mt-8 ">
            
              <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Team Member Image
                  </label>
                  <input
                    id="status"
                    name="img"
                    onChange={handleChange}
                   
                    type="file"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                     <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={uploadImage}
                  
                >
                  Upload Image
                </button>
                  {
                    teamimg&& <img src={teamimg} alt="img" className="w-52 h-52 my-2 "/>
                  }
                </div>
              
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                 About Team Member
                  </label>
                  <textarea
                    id="status"
                    name="desc"
                    onChange={handleChange}
                    value={desc}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    rows="3"
                    cols="10"
                  >
                    </textarea>
                
                  
                </div>
                
              </div>
              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                  onClick={handleCloseu}
                >
                  Cancel
                </button>
                <button
                  className="active:scale-95 rounded-lg bg-red-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={handleDeleteTeam}
                  
                >
                  Delete Team
                </button>
                <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={handleUpdateTeam}
                  
                >
                  Update Team
                </button>
                
              </div>
            </div>
          </div>
  </Box>
</Modal>
</>}
      </FullLayout>
    </ThemeProvider>
  );
};

export default AddEvent;
