import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsBuildingCheck } from "react-icons/bs";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { IoMdCloseCircle } from "react-icons/io";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUserData } from "@/appstore/userData";
import Error from "@/pages/Error";
import Link from "next/link";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { useRouter } from "next/router";
import "react-vertical-timeline-component/style.min.css";
import BlogSkeleton from "../skeleton/BlogSkeleton";
import { useSelector } from "react-redux";

const Eventdetails = () => {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorpage, setErrorpage] = useState(false);
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clg, setClg] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const userinfo = useSelector((state) => state.userData);
  //handle change function
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    } else if (e.target.name === "clg") {
      setClg(e.target.value);
    } else if (e.target.name === "linkedin") {
      setLinkedin(e.target.value);
    } else if (e.target.name === "github") {
      setGithub(e.target.value);
    } else if (e.target.name === "title") {
      setTitle(e.target.value);
    }
  };

  //get user data
  const getUser = async (token) => {
    console.log(token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuserdata`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    const result = await res.json();
    dispatch(
      addUserData({
        name: result.data.name,
        email: result.data.email,
        img: result.data.img,
        linkedin: result.data.linkedin,
        github: result.data.github,
        website: result.data.website,
        phone: result.data.phone,
        bio: result.data.bio,
        clg: result.data.clg,
        title: result.data.title,
      })
    );
  };
  //use effect
  useEffect(() => {
    var w = window.innerWidth;
    if (w >= 500) {
      setWidth(800);
    } else {
      setWidth(400);
    }
    if (localStorage.getItem("innovateUuser")) {
      const data = JSON.parse(localStorage.getItem("innovateUuser")).token;

      getUser(data);
    }
  }, []);
  //style for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    bgcolor: "#1c0119",
    border: "2px solid #4a0343",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };

  //fetch events
  const fetchEvents = async (id) => {
    setLoading(true);
    const data = { status: "getbyid", id };
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
    setLoading(false);
    if (result.success == true) {
      setEvent(result.event);
    } else {
      setErrorpage(false);
    }
    setEvent(result.event);
  };
  useEffect(() => {
    let id = router.query.id;
    fetchEvents(id);
  }, [router.query.id]);
  console.log(event);
  //logic for registration count bar
  const valuefunc = () => {
    if (event.eventreglimit == "unlimited") {
      return 20;
    } else if (event.eventreglimit != "unlimited") {
      return (event.eventregcount / event.eventreglimit) * 100;
    }
  };
  const handleOpen = () => {
    setOpen(true);
    setName(userinfo.name);
    setEmail(userinfo.email);
    setPhone(userinfo.phone);
    setClg(userinfo.clg);
    setLinkedin(userinfo.linkedin);
    setGithub(userinfo.github);
    setTitle(userinfo.title);
    setImage(userinfo.img);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //handle registration
  const handleRegistratation = async (link, id) => {
    if (link != "") {
      toast.success(
        "Please proceed to the registration page. Ensure all required details are filled out accurately and submit the form to complete your registration process. Thank you.",
        { icon: "👏" }
      );
      setTimeout(() => {
        window.open(link, "_blank");
      }, 3000);
    } //end of if
    else {
      handleOpen();
    }
  };
  const handleSubmit = async (e) => {
    const data = {
      name,
      email,
      phone,
      clg,
      github,
      linkedin,
      img,
      title,
      id: event._id,
      estatus: "new",
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/eventr`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (result.success == true) {
      toast.success(result.message, { icon: "👏" });

      if (result.order != null) {
        console.log(result.order);
        router.push(
          `/components/Events/Payment?orderid=${result.order.id}&&name=${result.event.eventname}&&amount=${result.event.eventregfee}&&id=${result.event._id}&&poster=${event.eventposter}`
        );
      }
      if (result.orderid != null) {
        router.push(
          `/components/Events/Payment?orderid=${result.order.orderid}&&name=${result.event.eventname}&&amount=${result.event.eventregfee}&&id=${result.event._id}&&poster=${event.eventposter}`
        );
      }
      if (result.order == null) {
        router.push(`/components/Events/Eventconf?id=${result.id}`);
      }

      handleClose();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        {loading ? (
          <div className="min-h-screen my-20">
            <BlogSkeleton />
          </div>
        ) : (
          event && (
            <section className="py-10 font-poppins bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 my-20 mx-2 rounded-lg">
              <div className="max-w-6xl px-4 mx-auto">
                <div className="flex flex-wrap mb-24 -mx-4 ">
                  <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                    <div className="sticky top-0 overflow-hidden ">
                      <div className="relative mb-6 lg:mb-10 lg:h-96 ">
                        {/* <a
                    className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-left dark:text-blue-200"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                      ></path>
                    </svg>
                  </a> */}
                        <img
                          className="object-contain w-full lg:h-full "
                          src={`${event.eventposter}`}
                          alt="event poster"
                        />

                        {/* <a
                    className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      className="w-5 h-5 text-blue-500 bi bi-chevron-right dark:text-blue-200"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                      ></path>
                    </svg>
                  </a> */}
                      </div>
                      <div className="flex-wrap hidden -mx-2 md:flex">
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                            href="#"
                          >
                            <img
                              className="object-contain w-full lg:h-28"
                              src={`${event.eventposter}`}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                            href="#"
                          >
                            <img
                              className="object-contain w-full lg:h-28"
                              src={`${event && event.eventposter}`}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                            href="#"
                          >
                            <img
                              className="object-contain w-full lg:h-28"
                              src={`${event.eventposter}`}
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="w-1/2 p-2 sm:w-1/4">
                          <a
                            className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                            href="#"
                          >
                            <img
                              className="object-contain w-full lg:h-28"
                              src={`${event && event.eventposter}`}
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="lg:pl-20">
                      <div className="mb-6 ">
                        <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-100">
                          New Event
                        </span>
                        <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-white md:text-2xl navfont">
                          {event.eventname}
                        </h2>
                        <div className="flex flex-wrap items-center mb-6">
                          <ul className="flex mb-4 mr-2 lg:mb-0">
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="currentColor"
                                  className="w-4 mr-1 text-red-500  bi bi-star "
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="currentColor"
                                  className="w-4 mr-1 text-red-500  bi bi-star "
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="currentColor"
                                  className="w-4 mr-1 text-red-500  bi bi-star "
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  fill="currentColor"
                                  className="w-4 mr-1 text-purple-600  bi bi-star "
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                                </svg>
                              </a>
                            </li>
                          </ul>
                          <Link
                            className="mb-4 text-xs underline hover:text-blue-600 text-white lg:mb-0"
                            href="/"
                          >
                            Organise By InnovateU
                          </Link>
                        </div>
                        <p className="inline-block text-2xl font-semibold text-gray-100 dark:text-gray-100 ">
                          {event.eventregfee != "free" && (
                            <span>₹{event.eventregfee}</span>
                          )}

                          {event.eventregfee == "free" && (
                            <span className="text-green-500 navfont">
                              ₹ Free
                            </span>
                          )}
                          <span className="ml-3 text-base font-normal text-gray-100 line-through dark:text-gray-100">
                            ₹10,000.00
                          </span>
                        </p>
                      </div>
                      <div className="mb-6">
                        <h2 className="mb-2 text-lg font-bold text-gray-100 dark:text-gray-100">
                          Event Specs :
                        </h2>
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                          <div className="p-3 lg:p-5 ">
                            <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                              <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                <div className="w-full mb-4 md:w-2/5">
                                  <div className="flex ">
                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                      <CiCalendarDate className="bi bi-gpu-card w-8 h-8" />
                                    </span>
                                    <div>
                                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Event Date
                                      </p>
                                      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                        {event.eventdate}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full mb-4 md:w-2/5">
                                  <div className="flex ">
                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                      <IoMdTime className=" w-8 h-8" />
                                    </span>
                                    <div>
                                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Time & Duration
                                      </p>
                                      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                        {event.eventdate} |{" "}
                                        {event.eventduration}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                  <div className="flex ">
                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                      <CiMicrophoneOn className=" w-8 h-8" />
                                    </span>
                                    <div>
                                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Speaker
                                      </p>
                                      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                        {event.eventspeaker}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                                <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                                  <div className="flex ">
                                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                                      <BsBuildingCheck className=" w-8 h-8" />
                                    </span>
                                    <div>
                                      <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Venue
                                      </p>
                                      <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                                        {event.eventvenue}
                                      </h2>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 mb-8 border border-gray-300 bg-white rounded-lg">
                        <h2 className="mb-4 text-xl font-semibold dark:text-gray-400">
                          Total Seats{" "}
                          <span className="px-2 bg-blue-500 text-gray-50">
                            {event.eventreglimit}
                          </span>{" "}
                          for this event right now!{" "}
                        </h2>
                        <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                          Hurry up! left{" "}
                          {event.eventreglimit == "unlimited"
                            ? "unlimited"
                            : event.eventreglimit - event.eventregcount}{" "}
                          seats.
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                          <div
                            className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                            style={{ width: `${valuefunc()}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex gap-4 mb-6">
                        {event.eventregstatus == "open" && (
                          <button
                            className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent  hover:border-blue-500 hover:text-blue-100 hover:bg-blue-800  dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
                            onClick={() => {
                              handleRegistratation(
                                event.eventreglink,
                                event._id
                              );
                            }}
                          >
                            Register Now
                          </button>
                        )}
                        {event.eventregstatus == "closed" && (
                          <button
                            className="w-full px-4 py-3 text-center text-gray-100 bg-red-600 border border-transparent  hover:border-blue-500 hover:text-blue-100 hover:bg-red-800  dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl "
                            disabled="true"
                          >
                            Registration Closed
                          </button>
                        )}
                        {event.eventregstatus == "over" && (
                          <button
                            className="w-full px-4 py-3 text-center text-gray-100 bg-red-600 border border-transparent  hover:border-blue-500 hover:text-blue-100 hover:bg-red-800  dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl "
                            disabled="true"
                          >
                            Registration Full
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <section className="flex items-center   font-poppins ">
                <div className="justify-center flex-1 max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                  <div className="flex flex-wrap ">
                    <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                      <div className="relative">
                        <img
                          src={`${event.eventposter}`}
                          alt=""
                          className="relative z-40 object-cover w-full h-96 lg:rounded-tr-[80px] lg:rounded-bl-[80px] rounded"
                        />
                        <div className="absolute z-10 hidden w-full h-full bg-blue-600 rounded-bl-[80px] rounded -bottom-6 right-6 lg:block"></div>
                        <div className="absolute z-50 text-blue-600 transform -translate-y-1/2 cursor-pointer top-1/2 left-[46%] hover:text-blue-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={16}
                            fill="currentColor"
                            className="w-14 h-14 bi bi-play-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                      <div className="relative">
                        <h1 className="absolute -top-20   left-0 text-[20px] lg:text-[100px]  font-bold  text-gray-100 opacity-5 md:block hidden navfont">
                          About The Event
                        </h1>
                        <h1 className="pl-2 text-3xl font-bold border-l-8 border-blue-400 md:text-5xl text-white navfont">
                          {event.eventname}
                        </h1>
                      </div>
                      <p className="mt-6 mb-10 text-base leading-7 text-gray-200 navfont">
                        {event.eventdesc}
                      </p>
                      <a
                        href="#"
                        className="px-4 py-3 text-gray-50 transition-all transform bg-blue-800 rounded-[80px] hover:bg-blue-900 dark:hover:text-gray-100 dark:text-gray-100 navfont"
                      >
                        About the Event
                      </a>
                    </div>
                  </div>
                </div>
              </section>
              <div className="flex justify-center items-center my-4 flex-col">
                <h1 className="navfont text-white text-4xl">TimeLine</h1>
                <div className="h-1 w-40 text-purple-600 rounded-full bg-blue-800"></div>
              </div>
              <VerticalTimeline className="overflow-hidden">
                <VerticalTimelineElement
                  className="vertical-timeline-element--work "
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid  rgb(33, 150, 243)",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<CiCalendarDate />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    Registration opens
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Date & Time :- {event.eventdate} | {event.eventtime}{" "}
                  </h4>
                  <p>
                    Welcome to {event.eventname} ! Get ready to kick off an
                    exciting day of learning and networking.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<IoMdTime />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    Opening ceremony
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Date & Time: {event.eventdate} |{" "}
                    {event.eventtime &&
                      event.eventtime.split(":00").join(":05")}
                  </h4>
                  <p>
                    Join us for the official opening ceremony, where we set the
                    stage for a day filled with insights, connections, and
                    inspiration.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<CiMicrophoneOn />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    Keynote speaker/session
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Date & Time: {event.eventdate} |{" "}
                    {event.eventtime &&
                      event.eventtime.split(":00").join(":06")}
                  </h4>
                  <p>
                    Immerse yourself in a thought-provoking session by our
                    distinguished keynote speaker. Gain valuable insights and
                    perspectives.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<BsBuildingCheck />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    Panel discussions
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Date & Time: {event.eventdate} |{" "}
                    {event.eventtime &&
                      event.eventtime.split(":00").join(":45")}
                  </h4>
                  <p>
                    Engage in interactive panel discussions featuring industry
                    experts. Explore current trends, challenges, and innovative
                    solutions.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<CiCalendarDate />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    FAQ & Open Questions
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Date & Time: {event.eventdate} |{" "}
                    {event.eventtime &&
                      event.eventtime.split(":00").join(":55")}
                  </h4>
                  <p>
                    We love hearing from you! If you have any questions not
                    covered here or if you are seeking more information, feel
                    free to reach out. Our team is here to help.
                  </p>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  className="vertical-timeline-element--education"
                  contentStyle={{
                    background: "rgb(42, 8, 156)",
                    color: "#fff",
                  }}
                  date={`${event.eventdate}`}
                  iconStyle={{ background: "rgb(42, 8, 156)", color: "#fff" }}
                  icon={<CiCalendarDate />}
                >
                  <h3 className="vertical-timeline-element-title navfont">
                    Thank-you messages to sponsors and participants & Closing
                    ceremony
                  </h3>
                  <h4 className="vertical-timeline-element-subtitle">
                    Follow us on Social Media Platforms for real-time updates
                    and engage with the community. Use the hashtag #
                    {event.eventname} to join the conversation. We look forward
                    to welcoming you to {event.eventname} and making it an
                    enriching experience for everyone!{" "}
                  </h4>
                </VerticalTimelineElement>
              </VerticalTimeline>
            </section>
          )
        )}
      </div>
      {errorpage == true && (
        <>
          <div className="overflow-hidden">
            <Error />
          </div>
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            className="absolute top-2 right-2 text-purple-600"
            onClick={handleClose}
          >
            <IoMdCloseCircle className="text-4xl" />
          </div>
          <div className="overflow-y-scroll max-h-[90vh]">
            <div className="mt-6 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700 ">
              <div className="p-4 sm:p-7">
                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    Register For {event && event.eventname}
                  </h1>

                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Save your information in your profile for quicker
                    registration next time -
                    <Link
                      className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      href="/components/Profile"
                      target="_blank"
                    >
                      {" "}
                      MyProfile
                    </Link>
                  </p>
                </div>
                <div className="mt-5">
                  {/* Form */}

                  <div className="grid gap-y-4">
                    {/* Form Group */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full  rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2 border-gray-400"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={handleChange}
                          name="email"
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="example@gmail.com"
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Phone
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          id="phone"
                          value={phone}
                          onChange={handleChange}
                          name="phone"
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="+91 XXXXXXXXXX"
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Checkbox */}
                    <div>
                      <label
                        htmlFor="clg"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        College/Organization
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="clg"
                          name="clg"
                          value={clg}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="Enter your college/organization name. ex:-CUTM,etc."
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Form Group */}
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Title/Role
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={title}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="Enter your title/role. ex:- student,developer,etc."
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Checkbox */}
                    <div>
                      <label
                        htmlFor="github"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Github Url
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          id="title"
                          name="github"
                          value={github}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="Enter your github url."
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        Linkedin Url
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          id="linkedin"
                          name="linkedin"
                          value={linkedin}
                          onChange={handleChange}
                          className="py-3 px-4 block w-full border-gray-400 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 border-2"
                          placeholder="Enter your linkedin url."
                        />
                      </div>
                    </div>
                    {/* End Form Group */}
                    {/* Checkbox */}
                    {/* End Form Group */}
                    {/* Checkbox */}

                    {/* End Checkbox */}
                    {event.eventregfee == "free" && (
                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={handleSubmit}
                      >
                        Register Now
                      </button>
                    )}
                    {event.eventregfee != "free" && (
                      <button
                        type="submit"
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={handleSubmit}
                      >
                        Procees to next step
                      </button>
                    )}
                  </div>
                  {/* End Form */}
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Eventdetails;
