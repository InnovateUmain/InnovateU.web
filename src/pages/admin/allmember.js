import React, { useEffect, useState } from "react";
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import toast, { Toaster } from "react-hot-toast";
import { IoMdCloseCircle } from "react-icons/io";
const Allmember = () => {
  const [user, setAlluser] = useState([]);
  const [serachuser, setSearchuser] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(6);
  const [intialcount, setIntialcount] = useState(0);
  const [width, setWidth] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setnPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [title, setTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [img, setImg] = useState("");
  const [college, setCollege] = useState("");
  const [bio, setBio] = useState("");
  const [searchq, setSearchq] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    var w = window.innerWidth;
    if (w >= 500) {
      setWidth(800);
    } else {
      setWidth(350);
    }
  }, []);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { width },
    bgcolor: "background.paper",
    border: "2px solid purple",
    boxShadow: 24,
    borderRadius: "6px",
    p: 4,
  };
  useEffect(() => {
    getalluser();
  }, []);
  const getalluser = async () => {
    const data = { id: "innovateUadminhandle", status: "user" };
    const pr = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/getalldata`,
      {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const res = await pr.json();
    if (res.data != null) {
      setAlluser(res.data);
    }
  };

  var val =
    "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80";

  const funccal = (title, github, linkedin, website, bio, img, clg) => {
    if (
      title.length > 0 &&
      github.length > 0 &&
      linkedin.length > 0 &&
      website.length > 0 &&
      bio.length > 0 &&
      img.length > 0 &&
      clg.length > 0
    ) {
      return "5/5";
    } else if (
      (title.length > 0 && github.length > 0 && linkedin.length > 0) ||
      (website.length > 0 && bio.length > 0 && img.length > 0 && clg.length > 0)
    ) {
      return "3/5";
    } else if (
      title.length == 0 &&
      github.length == 0 &&
      linkedin.length == 0 &&
      website.length == 0 &&
      bio.length == 0 &&
      img.length == 0 &&
      clg.length == 0
    ) {
      return "1/5";
    } else {
      return "2/5";
    }
  };
  const funccalp = (title, github, linkedin, website, bio, img, clg) => {
    if (
      title.length > 0 &&
      github.length > 0 &&
      linkedin.length > 0 &&
      website.length > 0 &&
      bio.length > 0 &&
      img.length > 0 &&
      clg.length > 0
    ) {
      return "100%";
    } else if (
      (title.length > 0 && github.length > 0 && linkedin.length > 0) ||
      (website.length > 0 && bio.length > 0 && img.length > 0 && clg.length > 0)
    ) {
      return "78%";
    } else if (
      title.length == 0 &&
      github.length == 0 &&
      linkedin.length == 0 &&
      website.length == 0 &&
      bio.length == 0 &&
      img.length == 0 &&
      clg.length == 0
    ) {
      return "30%";
    } else {
      return "50%";
    }
  };

  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setnPassword(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "af-account-gender-checkbox") {
      console.log(gender);
      setGender(e.target.value);
    } else if (e.target.name == "college") {
      setCollege(e.target.value);
    } else if (e.target.name == "linkedin") {
      setLinkedin(e.target.value);
    } else if (e.target.name == "github") {
      setGithub(e.target.value);
    } else if (e.target.name == "website") {
      setWebsite(e.target.value);
    } else if (e.target.name == "img") {
      setImg(e.target.value);
    } else if (e.target.name == "bio") {
      setBio(e.target.value);
    } else if (e.target.name == "image") {
      setImage(e.target.files[0]);
    } else if (e.target.name == "title") {
      setTitle(e.target.value);
    } else if (e.target.name == "search") {
      setSearchq(e.target.value);
      if (e.target.value.length > 0) {
        setIsSearch(true);
      }
      if (e.target.value.length == 0) {
        setIsSearch(false);
      }

      const res = user.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchuser(res);
    }
  };
  const getUser = (
    name,
    email,
    phone,
    title,
    github,
    linkedin,
    website,
    bio,
    clg
  ) => {
    handleOpen();
    setName(name);
    setEmail(email);
    setPhone(phone);
    setTitle(title);
    setGithub(github);
    setLinkedin(linkedin);
    setWebsite(website);
    setBio(bio);
    setCollege(clg);
  };
  const updateuser = async (ulurl) => {
    let upurl = ulurl !== "" ? ulurl : url;
    setLoading(true);
    const data = {
      name,
      email,
      bio,
      phone,
      college,
      github,
      linkedin,
      website,
      img: upurl,
      title,
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
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
    } else {
      toast.error("Something went wrong ! Please try again");
      setLoading(false);
    }
    handleClose();
    getalluser();
  };
  //update password

  const handleUpdate = () => {
    if (password === "" || npassword === "") {
      updateuser();
    } else if (password != "" && npassword != "") {
      updatepassword();
      updateuser();
    }
  };
  const alldata = () => {
    setCount(user.length);
    setIntialcount(0);
  };
  const exportexcel = async () => {
    window.open(
      `${process.env.NEXT_PUBLIC_HOST}/api/admin/Excel/getexcel?data=user`,
      "_blank"
    );
  };

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
        <>
          {/* Table Section */}
          <Toaster position="top-center" reverseOrder={false} />
          <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            {/* Card */}
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-gray-700">
                    {/* Header */}
                    <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          Users
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add users, edit and more.
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
                          value={searchq}
                        />
                      </div>
                      <div>
                        <div className="inline-flex gap-x-2">
                          <button
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={alldata}
                          >
                            View all
                          </button>
                          <button
                            className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                            onClick={() => {
                              exportexcel();
                            }}
                          >
                            <svg
                              className="flex-shrink-0 w-3 h-3"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M2.63452 7.50001L13.6345 7.5M8.13452 13V2"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                              />
                            </svg>
                            Export Excel
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* End Header */}
                    {/* Table */}
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-slate-800">
                        <tr>
                          <th scope="col" className="ps-6 py-3 text-start"></th>
                          <th
                            scope="col"
                            className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start"
                          >
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Name
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
                                Phone
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Portfolio
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-start">
                            <div className="flex items-center gap-x-2">
                              <span className="text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200">
                                Created
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-end" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {/* end of 1 row */}
                        {isSearch &&
                          serachuser.map((serachuser) => (
                            <tr key={serachuser._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img
                                      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                                      src={`${
                                        serachuser.img != ""
                                          ? serachuser.img
                                          : val
                                      }`}
                                      alt="Image Description"
                                    />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {serachuser.name}
                                      </span>
                                      <span className="block text-sm text-gray-500">
                                        {serachuser.email}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-72 whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    Title
                                  </span>
                                  <span className="block text-sm text-gray-500">
                                    {serachuser.title.length > 0
                                      ? serachuser.title
                                      : "User"}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                    {serachuser.phone}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500">
                                      {funccal(
                                        serachuser.title,
                                        serachuser.github,
                                        serachuser.linkedin,
                                        serachuser.website,
                                        serachuser.bio,
                                        serachuser.img,
                                        serachuser.clg
                                      )}
                                    </span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                      <div
                                        className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200"
                                        role="progressbar"
                                        style={{
                                          width: `${funccalp(
                                            serachuser.title,
                                            serachuser.github,
                                            serachuser.linkedin,
                                            serachuser.website,
                                            serachuser.bio,
                                            serachuser.img,
                                            serachuser.clg
                                          )}`,
                                        }}
                                        aria-valuenow={78}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span
                                    className="text-sm text-gray-500"
                                    onClick={() => {
                                      date = new Date(serachuser.createdAt);
                                    }}
                                  >
                                    {new Date(
                                      serachuser.createdAt
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
                                  <button
                                    className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={() =>
                                      getUser(
                                        serachuser.name,
                                        serachuser.email,
                                        serachuser.phone,
                                        serachuser.title,
                                        serachuser.github,
                                        serachuser.linkedin,
                                        serachuser.website,
                                        serachuser.bio,
                                        serachuser.clg
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                        {!isSearch &&
                          user.slice(intialcount, count).map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img
                                      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                                      src={`${item.img != "" ? item.img : val}`}
                                      alt="Image Description"
                                    />
                                    <div className="grow">
                                      <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                        {item.name}
                                      </span>
                                      <span className="block text-sm text-gray-500">
                                        {item.email}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-72 whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
                                    Title
                                  </span>
                                  <span className="block text-sm text-gray-500">
                                    {item.title.length > 0
                                      ? item.title
                                      : "User"}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                    {item.phone}
                                  </span>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <span className="text-xs text-gray-500">
                                      {funccal(
                                        item.title,
                                        item.github,
                                        item.linkedin,
                                        item.website,
                                        item.bio,
                                        item.img,
                                        item.clg
                                      )}
                                    </span>
                                    <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                                      <div
                                        className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-gray-200"
                                        role="progressbar"
                                        style={{
                                          width: `${funccalp(
                                            item.title,
                                            item.github,
                                            item.linkedin,
                                            item.website,
                                            item.bio,
                                            item.img,
                                            item.clg
                                          )}`,
                                        }}
                                        aria-valuenow={78}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span
                                    className="text-sm text-gray-500"
                                    onClick={() => {
                                      date = new Date(item.createdAt);
                                    }}
                                  >
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
                                  <button
                                    className="inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={() =>
                                      getUser(
                                        item.name,
                                        item.email,
                                        item.phone,
                                        item.title,
                                        item.github,
                                        item.linkedin,
                                        item.website,
                                        item.bio,
                                        item.clg
                                      )
                                    }
                                  >
                                    Edit
                                  </button>
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
                            {user.length}
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
                              if (count < user.length) {
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                className="absolute top-4 right-4 text-purple-600"
                onClick={handleClose}
              >
                <IoMdCloseCircle className="text-4xl" />
              </div>
              <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto overflow-y-scroll max-h-[80vh]">
                {/* Card */}
                <div className="bg-slate-900 rounded-xl shadow p-4 sm:p-7 ">
                  <div className="mb-8">
                    <h2 className="text-xl font-bold  text-gray-200">
                      Profile
                    </h2>
                    <p className="text-sm text-gray-400">
                      Manage your name, password and account settings. Note:
                      Email cannot be updated.
                    </p>
                  </div>
                  <form>
                    {/* Grid */}
                    <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
                      <div className="sm:col-span-3">
                        <label className="inline-block text-sm  mt-2.5 text-gray-200">
                          Profile photo
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="flex items-center gap-5">
                          <div className="flex gap-x-2"></div>
                        </div>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-full-name"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          Full name
                        </label>
                        <div className="hs-tooltip inline-block">
                          <button
                            type="button"
                            className="hs-tooltip-toggle ms-1"
                          >
                            <svg
                              className="inline-block w-3 h-3 text-gray-600"
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="sm:flex">
                          <input
                            id="af-account-full-name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            value={name}
                            className="py-2 px-3 pe-11 block w-full  shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder="John doe "
                          />
                        </div>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-email"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          Email
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <input
                          id="af-account-email"
                          type="email"
                          name="email"
                          onChange={handleChange}
                          value={email}
                          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          placeholder="maria@site.com"
                          readOnly
                        />
                      </div>
                      {/* End Col */}

                      {/* End Col */}

                      {/* End Col */}
                      <div className="sm:col-span-3">
                        <div className="inline-block">
                          <label
                            htmlFor="af-account-phone"
                            className="inline-block text-sm  mt-2.5 text-gray-200"
                          >
                            Phone
                          </label>
                          <span className="text-sm  text-gray-600">
                            (Optional)
                          </span>
                        </div>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="sm:flex">
                          <input
                            id="af-account-phone"
                            type="number"
                            name="phone"
                            onChange={handleChange}
                            value={phone}
                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder="+x(xxx)xxx-xx-xx"
                          />
                          <select className="py-2 px-3 pe-9 block w-full sm:w-auto border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                            <option selected="">Mobile</option>
                            <option>Home</option>
                            <option>Work</option>
                            <option>Fax</option>
                          </select>
                        </div>
                      </div>
                      {/* End Col */}

                      {/* End Col */}

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-email"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          College/Org
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <input
                          id="af-account-email"
                          type="text"
                          name="college"
                          onChange={handleChange}
                          value={college}
                          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          placeholder="Enter Your College / Organization Name"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-email"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          Title/Role
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <input
                          id="af-account-email"
                          type="text"
                          name="title"
                          onChange={handleChange}
                          value={title}
                          className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          placeholder="Enter Your Title/Role ex:- Student,Developer,etc"
                        />
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-password"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          Github
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="space-y-2">
                          <input
                            id="af-account-password"
                            type="url"
                            name="github"
                            onChange={handleChange}
                            value={github}
                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder="Enter Your Github URL"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-password"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          LinkedIn
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="space-y-2">
                          <input
                            id="af-account-password"
                            type="url"
                            name="linkedin"
                            onChange={handleChange}
                            value={linkedin}
                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder="Enter Your LinkedIn URL"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-password"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          Website
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <div className="space-y-2">
                          <input
                            id="af-account-password"
                            type="text"
                            name="website"
                            onChange={handleChange}
                            value={website}
                            className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                            placeholder="Enter Your Protfolio/Other Website URL"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="af-account-bio"
                          className="inline-block text-sm  mt-2.5 text-gray-200"
                        >
                          BIO
                        </label>
                      </div>
                      {/* End Col */}
                      <div className="sm:col-span-9">
                        <textarea
                          id="af-account-bio"
                          name="bio"
                          onChange={handleChange}
                          value={bio}
                          className="py-2 px-3 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                          rows={6}
                          placeholder="Type your message..."
                          defaultValue={""}
                        />
                      </div>

                      {/* End Col */}
                    </div>
                    {/* End Grid */}
                    <div className="mt-5 flex justify-end gap-x-2">
                      <button
                        type="button"
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdate}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-purple-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
                {/* End Card */}
              </div>
            </Box>
          </Modal>
          {/* End Table Section */}
        </>
      </FullLayout>
    </ThemeProvider>
  );
};

export default Allmember;
