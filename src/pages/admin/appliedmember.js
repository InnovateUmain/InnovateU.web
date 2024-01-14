import React, { useEffect, useState } from "react";
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { set } from "mongoose";
const Appliedmember = () => {
  //all state
  const [event, setEvent] = useState([]);
  const [tabledata, setTabledata] = useState([]);
  const [searcharray, setSearcharray] = useState([]); 
  const [isSearch, setIsSearch] = useState(false);
  const [eventname, setEventname] = useState([]);
  const [eventdate, setEventdate] = useState([]);
  const [eventstatus, setEventstatus] = useState([]);
  const [eventtype, setEventtype] = useState([]);
  const [searchquery, setSearchquery] = useState("");
  //handle change
  const handleChange = (e) => {
    if (e.target.name == "eventname") {
      setEventname(e.target.value);
    } else if (e.target.name == "eventdate") {
      setEventdate(e.target.value);
    } else if (e.target.name == "eventstatus") {
      setEventstatus(e.target.value);
    } else if (e.target.name == "eventtype") {
      setEventtype(e.target.value);
    }
    else if(e.target.name=="search"){
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
      setSearcharray(res);
    }

  };
  //fetch event
  const fetcheventname = async () => {
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
    setEvent(result.event);
  };
  //fetch table data of event
  const fetchevent = async () => {
    const data = { status: "getdata" };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Get/getrevent`,
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
  };
  //use effect
  useEffect(() => {
    fetcheventname();
    fetchevent();
  }, []);
  //search;
  console.log(tabledata);
  const handleSearch = async () => {};
  //reset
  const reset = () => {
    setEventname("");
    setEventdate("");
    setEventstatus("");
    setEventtype("");
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <FullLayout>
          <div className="m-2 w-full px-4 lg:px-8 py-4 mx-auto">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
              <h2 className="text-stone-700 text-xl font-bold">
                Apply Filters
              </h2>
              <p className="mt-1 text-sm">
                Use filters to further refine event search
              </p>
              <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="status"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Select Event
                  </label>
                  <select
                    id="status"
                    name="eventname"
                    onChange={handleChange}
                    value={eventname}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Select</option>
                    {event.map((item) => (
                      <option key={item._id} value={item.eventname}>
                        {item.eventname}
                      </option>
                    ))}
                  </select>
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
                    onChange={handleChange}
                    value={eventtype}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Select</option>
                    <option value={"paid"}>Paid</option>
                    <option value={"free"}>Free</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label
                    htmlFor="date"
                    className="text-stone-600 text-sm font-medium"
                  >
                    Date of the Event
                  </label>
                  <input
                    type="date"
                    name="eventdate"
                    onChange={handleChange}
                    value={eventdate}
                    id="date"
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
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
                    onChange={handleChange}
                    value={eventstatus}
                    className="mt-2 block w-full rounded-md border border-gray-200 px-2 py-3 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Select</option>
                    <option>Pending at admin side</option>
                    <option>Success</option>
                    <option> Claimed </option>
                    <option>Not Claimed</option>
                    <option>All</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button
                  className="active:scale-95 rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-600 outline-none focus:ring hover:opacity-90"
                  onClick={reset}
                >
                  Reset
                </button>
                <button
                  className="active:scale-95 rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none focus:ring hover:opacity-90"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <>
            <style jsx global>{`
              #footer {
                display: none;
              }
              #navbar {
                display: none;
              }
            `}</style>

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
                          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            Events User Data
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            List of all events user data with filters and
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
                            <a
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
                            >
                              View all
                            </a>
                            <a
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                              href="#"
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
                                <path d="M5 12h14" />
                                <path d="M12 5v14" />
                              </svg>
                              Create
                            </a>
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
                                  Event Name
                                </span>
                              </div>
                            </th>
                            <th scope="col" className="px-6 py-3 text-start">
                              <div className="flex items-center gap-x-2">
                                <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                  Event Type
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
                          {!isSearch&&tabledata.map((item) => (
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
                                    <img
                                      className="inline-block h-6 w-6 rounded-full"
                                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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
                                  {item.ticketstatus}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventstatus == "success" ? (
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
                                      Successful
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
                                      Pending
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
                                    <img
                                      className="inline-block h-6 w-6 rounded-full"
                                      src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
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
                                  {item.ticketstatus}
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  {item.eventstatus == "success" ? (
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
                                      Successful
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
                                      Pending
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
                          <div className="inline-flex gap-x-2">
                            <button
                              type="button"
                              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
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
        </FullLayout>
      </ThemeProvider>
    </div>
  );
};

export default Appliedmember;
