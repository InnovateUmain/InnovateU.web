import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiTwitterXLine } from "react-icons/ri";
import { FaMapLocationDot, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/router";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Spinner from "../Spinner";
import toast, { Toaster } from "react-hot-toast";
const Hero = () => {
  const userinfo = useSelector((state) => state.userData);
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
  const [loading, setLoading] = useState(false);
  const [openoops, setOpenOops] = useState(false);
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
  const router = useRouter();
  //adjusting width for modal
  useEffect(() => {
    var w = window.innerWidth;
    if (w >= 500) {
      setWidth(800);
     
    } else {
   
      setWidth(400);
     
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
  //controller for modal
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
  //submitting data to backend
  const handleSubmit = async (e) => {
    //validation
    if (
      name === "" ||
      email === "" ||
      phone === "" ||
      clg === "" ||
      linkedin === "" ||
      github === "" ||
      title === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    //check user is exist or not
    const userdata = { email, estatus: "checkuser" };
    const checkuser = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/eventr`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata),
      }
    );
    const userresult = await checkuser.json();
    //if user exist and payment is pending then redirect to payment page
    if (userresult.data != null) {
      if (
        userresult.data.orderid != "" &&
        userresult.data.paymentstatus == "pending"
      ) {
        router.push(
          `/components/Events/Payment?orderid=${userresult.data.orderid}`
        );
      }
      //if user exist and payment is paid then show toast
      else if (
        userresult.data.orderid != "" &&
        userresult.data.paymentstatus == "paid"
      ) {
        toast.success(
          "Wooh 🎉🎉🎉 ! You are already registered for the Devcon 2k24"
        );
        setLoading(false);
      }
    }
    //if user not exist then save data to db and redirect to payment page
    else {
      const data = {
        name,
        email,
        phone,
        clg,
        github,
        linkedin,
        img,
        title,
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
      if (result.success) {
        toast.success(result.message);
        setLoading(false);
        setOpen(false);
        router.push(`/components/Events/Payment?orderid=${result.order.id}`);
      } else {
        toast.error(result.message);
        setLoading(false);
      }
    }
  };
  const handleopenoops = () => {
    setOpenOops(true);
  };
  const handlecloseoops = () => {
    setOpenOops(false);
  };

  return (
    <div className="overflow-x-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <style jsx>
        {`
          @import url("https://fonts.googleapis.com/css2?family=Play&display=swap");
          @import url("https://fonts.googleapis.com/css2?family=Lilita+One&display=swap");
          .herofont {
            font-family: "Lilita One", sans-serif;
          }
          .dt {
            font-family: "Play", sans-serif;
          }
          @media screen and (max-width: 416px) {
            .dt1 {
              font-family: "Play", sans-serif;
              font-size: 16px;
            }
          }
        `}
      </style>
      {loading ? (
        <div className="absolute top-10 lg:left-[47vw] text-white left-[40vw]">
          {" "}
          <Spinner />
        </div>
      ) : (
        <div>
          <section className="pt-12 bg-none sm:pt-16 absolute top-14 w-[100vw] h-[80vh] flex justify-center items-center">
            <motion.div
              className="px-4  sm:px-6 lg:px-8 "
              initial={{ opacity: 0, x: -200 }}
              animate={{ x: 0, opacity: 1 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                when: "beforeChildren",
              }}
            >
              <div className=" mx-auto text-center ">
                <h1 className="px-6 text-lg text-gray-200 herofont">
                  Welcome Innovators🧑‍💻
                </h1>
                <motion.div
                  drag
                  dragConstraints={{ left: 0, right: 4, top: 4, bottom: 4 }}
                >
                  <p className=" herofont hero-text font-bold  text-white sm:text-5xl lg:text-9xl leading-tight text-5xl md:text-8xl herofont">
                    DEVCON 2K24
                    {/* <span className="bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter opacity-30 w-full h-full absolute inset-0"></span> */}
                    <br />
                    <span className="herofont text-yellow-600">
                      {" "}
                      INNOVATEU{" "}
                    </span>
                  </p>
                </motion.div>

                <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-4 w-[100vw]">
                  <div className="flex justify-center items-center text-yellow-600  mx-2 my-2">
                    <BsFillCalendarCheckFill className="text-2xl mx-2 dt1" />
                    <p className="lg:text-2xl text-xl dt1">15 JAN 2024</p>
                    <FaMapLocationDot className="text-2xl mx-2 dt1" />
                    <p className="lg:text-2xl text-xl dt1">CUTM, ODISHA</p>
                  </div>

                  {/* <a
                  href="#Devtools"
                  title=""
                  className="inline-flex  items-center justify-center w-full px-8 py-3 text-lg font-bold text-white transition-all duration-200 bg-purple-600 border-2 border-transparent sm:w-auto rounded-xl font-pj hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  role="button"
                >
                  Explore More
                </a> */}
                </div>
                <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-6">
                  <motion.button
                    className="inline-flex  items-center justify-center px-10 py-2 text-lg text-black transition-all duration-200 bg-white border-2 border-none sm:w-auto rounded-xl   focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dt font-bold mx-2 my-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => {
                      if (localStorage.getItem("innovateUuser")) {
                        handleOpen();
                      } else {
                        handleopenoops();
                      }
                    }}
                  >
                    Register Now
                  </motion.button>
                  <motion.button
                    className="inline-flex  items-center justify-center px-10 py-2 text-lg text-black transition-all duration-200 bg-yellow-600 border-2 border-none sm:w-auto rounded-xl   focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dt font-bold mx-2 my-2"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9, rotate: 1 }}
                    transition={{ duration: 0.1 }}
                  >
                    Explore More
                  </motion.button>
                </div>
                <div className="px-8 sm:items-center sm:justify-center sm:px-0 sm:space-x-5 sm:flex mt-10 lg:absolute lg:right-8 ">
                  <div className="flex justify-center items-center text-white mx-2 my-2 ">
                    <FaLinkedinIn className="text-2xl mx-2 dt1 hover:text-green-600" />

                    <FaInstagram className="text-2xl mx-2 dt1 hover:text-green-600" />
                    <RiTwitterXLine className="text-2xl mx-2 dt1 hover:text-green-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="pb-12 bg-none"></div>
          </section>
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
                        Register For Devcon 2k24
                      </h1>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        If already registered -
                        <a
                          className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          href="../examples/html/signin.html"
                        >
                          See your ticket here
                        </a>
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
                        <button
                          type="submit"
                          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          onClick={handleSubmit}
                        >
                          Proceed to next step
                        </button>
                      </div>
                      {/* End Form */}
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      )}
      <Modal
  open={openoops}
  onClose={handlecloseoops}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handlecloseoops}>
    <IoMdCloseCircle className='text-4xl'/>
    </div>
  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="animate-tickScale inline-block bg-green-600 rounded-full">
    
           <img src="/oops.jpg" alt="no data img" className="h-52 w-52"/>
        </div>
        
        <h1 className="lg:text-4xl md:text-4xl sm:text-2xl font-semibold text-gray-800 mb-4 font text-2xl">OOPS ! 🤭🤭🤭</h1>
        <p className="text-lg text-gray-600 mb-4 font"> You have not created an account </p>
        <p className="text-lg text-gray-600 mb-2 font">Please create an account. If already created, please log in with your credentials before registering for  <span className='font-bold text-green-600'>DEVCON 2K24</span>.</p>
        <Link href="/Signup" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full inline-block mx-2 my-4 ">Create an Account</Link>
        <br/>
        <Link href="/Login" className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full inline-block">Login Now</Link>
    </div>
  </Box>
</Modal>
    </div>
  );
};

export default Hero;
