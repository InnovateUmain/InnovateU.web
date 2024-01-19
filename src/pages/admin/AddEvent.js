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
import { set } from "mongoose";
const AddEvent = () => {
  const [tabledata, setTabledata] = useState([]);
  const [searcharray, setSearcharray] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const [count, setCount] = useState(2);
  const [intialcount, setIntialcount] = useState(0);
  const [open, setOpen] = useState(false);
  const [width,setWidth]= useState(0);
  const [eventname, setEventname] = useState("");
  const [eventdate, setEventdate] = useState("");
  const [eventtime, setEventtime] = useState("");
  const [eventduration, setEventduration] = useState("");
  const [eventtype, setEventtype] = useState("");
  const [eventvenue, setEventvenue] = useState("");
  const [eventregfee, setEventregfee] = useState("");
  const [eventreglimit, setEventreglimit] = useState("");
  const [eventregstatus, setEventregstatus] = useState("");
  const [eventposter, setEventposter] = useState("");
  const [eventspeaker, setEventspeaker] = useState("");
  const [eventdescription, setEventdescription] = useState("");
  const [eventlink, setEventlink] = useState("");
  const [img, setImg] = useState("");
  const [eventstatus, setEventstatus] = useState("");
  const [eventregcount, setEventregcount] = useState("");
  const [eventreglastdate, setEventreglastdate] = useState("");
 const [loading, setLoading] = useState(false);
 const [openu, setOpenu] = useState(false);
 const [cardview,setCardview] = useState(false);
 const [eventgrplink,setEventgrplink] = useState("");
 const [id, setId] = useState("");

  const fetchevent = async () => {
    const data = { status: "get" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addevent`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await res.json();
    setTabledata(result.event);
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
          item.eventname.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearcharray(res)
    }
    else if(e.target.name == "eventname"){
      setEventname(e.target.value)
    }
    else if(e.target.name == "eventdate"){
      setEventdate(e.target.value)
    }
    else if (e.target.name=="eventtime"){
     setEventtime(e.target.value)
    }
    else if (e.target.name=="eventduration"){
      setEventduration(e.target.value)
     }
     else if (e.target.name=="eventtype"){
      setEventtype(e.target.value)
     
     }
    else if (e.target.name=="eventvenue"){
      setEventvenue(e.target.value)
     }
    else if (e.target.name=="eventregfee"){
      setEventregfee(e.target.value)
     }
    else if (e.target.name=="eventreglimit"){
      setEventreglimit(e.target.value)
     }
    else if (e.target.name=="eventregstatus"){
      setEventregstatus(e.target.value)
     }
    else if (e.target.name=="eventposter"){
      setEventposter(e.target.value)
     }
    else if (e.target.name=="eventspeaker"){
      setEventspeaker(e.target.value)
     }
    else if (e.target.name=="eventdescription"){
      setEventdescription(e.target.value)
     }
    else if (e.target.name=="eventlink"){
      setEventlink(e.target.value)
     }
    else if (e.target.name=="img"){
      setImg(e.target.files[0]);
     }
    else if (e.target.name=="eventstatus"){
      setEventstatus(e.target.value)
     }
    else if (e.target.name=="eventregcount"){
      setEventregcount(e.target.value)
    }
    else if (e.target.name=="eventreglastdate"){
      setEventreglastdate(e.target.value)
    }
    else if(e.target.name=="eventgrplink"){
      setEventgrplink(e.target.value)
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
            { header: "EventName", key: "eventname", width: 30 },
            { header: "Event Speaker", key: "eventspeaker", width: 30 },
            { header: "Event Venue", key: "eventvenue", width: 30 },
            { header: "Event Date", key: "eventdate", width: 30 },
            { header: "Event Time", key: "eventtime", width: 30 },
            { header: "Event Type", key: "eventtype", width: 30 },
            { header: "Event Reg Fee", key: "eventregfee", width: 30 },
            { header: "Reg Limit", key: "reglimit", width: 20 },
            { header: "Reg Count", key: "regcount", width: 20 },
            { header: "Event CreatedAt", key: "eventcreatedat", width: 30 },
            { header: "Event Status", key: "eventregstatus", width: 30 },
            
        ];
        tabledata.map((item)=>{
            worksheet.addRow({
                eventname:item.eventname,
                eventspeaker:item.eventspeaker,
                eventvenue:item.eventvenue,
                eventdate:item.eventdate,
                eventtime:item.eventtime,
                eventtype:item.eventtype,
                eventregfee:item.eventregfee,
                reglimit:item.eventreglimit,
                regcount:item.eventregcount,
                eventcreatedat:new Date(item.createdAt).toLocaleDateString("en-IN", {}),
                eventregstatus:item.eventregstatus,
            });
        })
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
        });
        const buf = await workbook.xlsx.writeBuffer()
      
        saveAs(new Blob([buf]), 'EventDetails.xlsx')
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
            setEventposter(data.url);
            setLoading(false);
            toast.success("Image uploaded successfully");
            setImg("");
            
          }).catch((err) => {
            setLoading(false);
            toast.error("Error while uploading image");
          });
      };
//add event function
      const handleAddEvent = async () => {
        if(eventname=="" && eventposter=="" ){
          toast.error("Please fill all the fields")
        }
//else 
        else{
        const data = { status: "add", eventname, eventdate, eventtime, eventduration, eventtype:eventtype, eventvenue, eventregfee, eventreglimit, eventregstatus, eventposter, eventspeaker, eventdesc:eventdescription, eventreglink:eventlink, eventregcount:0, eventreglastdate };
        //fetch api
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addevent`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
      if(result.success){
        toast.success(result.message)
        fetchevent();
        handleClose();
        setEventname("");
        setEventdate("");
        setEventtime("");
        setEventduration("");
        setEventtype("");
        setEventvenue("");
        setEventregfee("");
        setEventreglimit("");
        setEventregstatus("");
        setEventposter("");
        setEventspeaker("");
        setEventdescription("");
        setEventlink("");
        setImg("");
        setEventstatus("");
        setEventregcount("");
        setEventreglastdate("");

      }
      else{
        toast.error(result.message)
      }
    }

      };
      //delete event function
      const handleUpdateEvent = async () => {
        const data = { status: "update" ,id, eventname, eventdate, eventtime, eventduration, eventtype, eventvenue, eventregfee, eventreglimit, eventregstatus:eventstatus, eventposter, eventspeaker, eventdesc:eventdescription, eventreglink:eventlink, eventregcount, eventreglastdate,eventgrplink};
        console.log(data);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addevent`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        if(result.success){
          toast.success(result.message)
          fetchevent();
          handleCloseu();
        }
        else{
          toast.error(result.message)
          
        }
      }

      const handleDeleteEvent = async () => {
        let a  = confirm("Are you sure you want to delete this event?");
        if(a){
          const data = { status: "delete" ,id};
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/admin/Add/addevent`,
            {
              method: "POST", // or 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          const result = await res.json();
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
      console.log(cardview)
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
                          Add Event
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          List of all events add event and manage event.
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
                                Event Name
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Event Speaker
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Event Reg Count
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
                                Created Date
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-end" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {!isSearch &&
                          tabledata.slice(intialcount, count).map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-2">
                                    <img
                                      className="inline-block h-6 w-6 rounded-full"
                                      src={`${item.eventposter}`}
                                      alt="Image Description"
                                    />
                                    <div className="grow">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.eventname}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.eventspeaker}
                                  </span>
                                </div>
                              </td>

                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventregcount}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventregstatus == "open"? (
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
                                      Open
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
                                      {item.eventregstatus}
                                    </span>
                                  )}
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
                                        setEventname(item.eventname);
                                        setEventdate(item.eventdate);
                                        setEventtime(item.eventtime);
                                        setEventduration(item.eventduration);
                                        setEventtype(item.eventtype);
                                        setEventvenue(item.eventvenue);
                                        setEventregfee(item.eventregfee);
                                        setEventreglimit(item.eventreglimit);
                                        setEventregstatus(item.eventregstatus);
                                        setEventposter(item.eventposter);
                                        setEventspeaker(item.eventspeaker);
                                        setEventdescription(item.eventdesc);
                                        setEventlink(item.eventreglink);
                                        setEventstatus(item.eventstatus);
                                        setEventregcount(item.eventregcount);
                                        setEventreglastdate(item.eventreglastdate);
                                        setId(item._id);
                                        setEventstatus(item.eventregstatus);
                                        setEventgrplink(item.eventgrplink);
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
                                      src={`${item.eventposter}`}
                                      alt="Image Description"
                                    />
                                    <div className="grow">
                                      <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {item.eventname}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.eventspeaker}
                                  </span>
                                </div>
                              </td>

                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventregcount}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventregstatus == "open"? (
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
                                      Open
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
                                      {item.eventregstatus}
                                    </span>
                                  )}
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
                                        setEventname(item.eventname);
                                        setEventdate(item.eventdate);
                                        setEventtime(item.eventtime);
                                        setEventduration(item.eventduration);
                                        setEventtype(item.eventtype);
                                        setEventvenue(item.eventvenue);
                                        setEventregfee(item.eventregfee);
                                        setEventreglimit(item.eventreglimit);
                                        setEventregstatus(item.eventregstatus);
                                        setEventposter(item.eventposter);
                                        setEventspeaker(item.eventspeaker);
                                        setEventdescription(item.eventdesc);
                                        setEventlink(item.eventreglink);
                                        setEventstatus(item.eventstatus);
                                        setEventregcount(item.eventregcount);
                                        setEventreglastdate(item.eventreglastdate);
                                        setId(item._id);
                                        setEventstatus(item.eventregstatus);
                                        setEventgrplink(item.eventgrplink);
                                        
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
                            {tabledata.length}
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
                                setIntialcount(intialcount - 2);
                                setCount(count - 2);
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
                                setCount(count + 2);
                              } else if (count < searcharray.length) {
                                setIntialcount(count);
                                setCount(count + 2);
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
                    src={`${item.eventposter}`}
                    alt=""
                    className="object-cover w-full h-full rounded"
                  />
                  {item.eventregstatus=="open"&&<span className="absolute top-0 right-0 px-2 py-1 mt-2 mr-2 text-xs text-white bg-yellow-600">
                    Open
                  </span>}
                  {item.eventregstatus!="open"&&<span className="absolute top-0 right-0 px-2 py-1 mt-2 mr-2 text-xs text-white bg-red-600">
                    {item.eventregstatus}
                  </span>}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold dark:text-gray-300">
                     {item.eventname}
                    </h2>
                  </div>
                  <div className="text-base font-semibold text-green-600">₹{item.eventregfee}</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-medium dark:text-gray-400">
                    Event Date
                  </h2>
                  <span className="inline-block px-2 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-700 dark:text-blue-400 bg-blue-50">
                    {new Date(item.eventdate).toLocaleDateString("en-IN",{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xs font-medium dark:text-gray-400">Time</h2>
                  <span className="inline-block px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                 {item.eventtime}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xs font-medium dark:text-gray-400">
                   Event Duration
                  </h2>
                  <span className="inline-block px-2 py-1 text-xs text-blue-500 rounded-full bg-blue-50 dark:bg-gray-700 dark:text-blue-400">
                    {item.eventduration}
                  </span>
                </div>
               <div className="flex justify-between">

               
                <button
            className="px-3 py-2 text-xs text-white bg-blue-800 rounded hover:bg-blue-600 w-32"
            onClick={()=>{
              setId(item._id);
              setEventname(item.eventname);
              setEventdate(item.eventdate);
              setEventtime(item.eventtime);
              setEventduration(item.eventduration);
              setEventtype(item.eventtype);
              setEventvenue(item.eventvenue);
              setEventregfee(item.eventregfee);
              setEventreglimit(item.eventreglimit);
              setEventregstatus(item.eventregstatus);
              setEventposter(item.eventposter);
              setEventspeaker(item.eventspeaker);
              setEventdescription(item.eventdesc);
              setEventlink(item.eventreglink);
              setEventstatus(item.eventstatus);
              setEventregcount(item.eventregcount);
              setEventreglastdate(item.eventreglastdate);
              setEventstatus(item.eventregstatus);
              handleOpenu();
            }}
          >
            Update Event
          </button>
          <button
            
            className="px-3 py-2 text-xs text-white bg-red-800 rounded hover:bg-blue-600 mx-4 w-32"
            onClick={()=>{
              setId(item._id);
              handleDeleteEvent();
            }}
          >
            Delete Event
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
                Add a New Event
              </h2>
              <p className="mt-1 text-sm">
              Add a new event to the event list.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Name
                  </label>
                  <input
                    id="status"
                    name="eventname"
                    type="text"
                    value={eventname}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Date
                  </label>
                  <input
                    id="status"
                    name="eventdate"
                    value={eventdate}
                    type="date"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                   
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    EventTime
                  </label>
                  <input
                    id="status"
                    name="eventtime"
                    value={eventtime}
                    onChange={handleChange}
                    type="time"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Duration
                  </label>
                  <input
                    id="status"
                    name="eventduration"
                    type="text"
                    value={eventduration}
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
                    Event Venue
                  </label>
                  <input
                    id="status"
                    name="eventvenue"
                    type="text"
                    value={eventvenue}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Type
                  </label>
                  <select
                    id="status"
                    name="eventtype"
                    value={eventtype}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  >
                    <option>Select</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>

                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Reg Link(if applicable)
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="eventlink"
                    value={eventlink}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                   Event Reg Last Date
                  </label>
                  <input
                    id="status"
                    type="date"
                    name="eventreglastdate"
                    onChange={handleChange}
                    value={eventreglastdate}
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
                    Event Reg Limit
                  </label>
                  <input
                    id="status"
                    name="eventreglimit"
                    value={eventreglimit}
                    type="number"
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Speaker
                  </label>
                  <input
                    id="status"
                    name="eventspeaker"
                    type="text"
                    onChange={handleChange}
                    value={eventspeaker}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
               
               
              </div>
              <div className="mt-8 ">
              <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium my-2"
                  >
                    Event Reg Fee(if free then write free)
                  </label>
                  <input
                    id="status"
                    name="eventregfee"
                    type="text"
                    onChange={handleChange}
                    value={eventregfee}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                   
                  
                </div>
              <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Poster
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
                    eventposter&& <img src={eventposter} alt="img" className="w-52 h-52 my-2 "/>
                  }
                </div>
              
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                 Event Description
                  </label>
                  <textarea
                    id="status"
                    name="eventdescription"
                    onChange={handleChange}
                    value={eventdescription}
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
                onClick={handleAddEvent}
                  
                >
                  Add Event
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
               Update Event
              </h2>
              <p className="mt-1 text-sm">
              Update the event details.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Name
                  </label>
                  <input
                    id="status"
                    name="eventname"
                    type="text"
                    value={eventname}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Date
                  </label>
                  <input
                    id="status"
                    name="eventdate"
                    value={eventdate}
                    type="date"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                   
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    EventTime
                  </label>
                  <input
                    id="status"
                    name="eventtime"
                    value={eventtime}
                    onChange={handleChange}
                    type="time"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Duration
                  </label>
                  <input
                    id="status"
                    name="eventduration"
                    type="text"
                    value={eventduration}
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
                    Event Venue
                  </label>
                  <input
                    id="status"
                    name="eventvenue"
                    type="text"
                    value={eventvenue}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Type
                  </label>
                  <select
                    id="status"
                    name="eventtype"
                    value={eventtype}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  >
                    <option>Select</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>

                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Reg Link(if applicable)
                  </label>
                  <input
                    id="status"
                    type="url"
                    name="eventlink"
                    value={eventlink}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                 
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                   Event Reg Last Date
                  </label>
                  <input
                    id="status"
                    type="date"
                    name="eventreglastdate"
                    onChange={handleChange}
                    value={eventreglastdate}
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
                    Event Reg Limit
                  </label>
                  <input
                    id="status"
                    name="eventreglimit"
                    value={eventreglimit}
                    type="number"
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Reg Count
                  </label>
                  <input
                    id="status"
                    name="eventregcount"
                    type="text"
                    onChange={handleChange}
                    value={eventregcount}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Speaker
                  </label>
                  <input
                    id="status"
                    name="eventspeaker"
                    type="text"
                    onChange={handleChange}
                    value={eventspeaker}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Grp Link
                  </label>
                  <input
                    id="status"
                    name="eventgrplink"
                    type="url"
                    onChange={handleChange}
                    value={eventgrplink}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Status
                  </label>
                  <select
                    id="status"
                    name="eventstatus"
                    value={eventstatus}
                    onChange={handleChange}
                    
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  >
                    <option>Select</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    <option value="over">Over</option>
                  </select>

                </div>
               
              </div>
              <div className="mt-8 ">
              <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium my-2"
                  >
                    Event Reg Fee(if free then write free)
                  </label>
                  <input
                    id="status"
                    name="eventregfee"
                    type="text"
                    onChange={handleChange}
                    value={eventregfee}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    
                  />
                   
                  
                </div>
              <div className="flex flex-col my-2">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Event Poster
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
                    eventposter&& <img src={eventposter} alt="img" className="w-52 h-52 my-2 "/>
                  }
                </div>
              
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                 Event Description
                  </label>
                  <textarea
                    id="status"
                    name="eventdescription"
                    onChange={handleChange}
                    value={eventdescription}
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
                onClick={handleDeleteEvent}
                  
                >
                  Delete Event
                </button>
                <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                onClick={handleUpdateEvent}
                  
                >
                  Update Event
                </button>
                
              </div>
            </div>
          </div>
  </Box>
</Modal>
      </FullLayout>
    </ThemeProvider>
  );
};

export default AddEvent;
