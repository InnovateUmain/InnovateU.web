import React from 'react'
import theme from "../../../trc/theme/theme";
import FullLayout from "../../../trc/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect,useState } from 'react';
import toast,{Toaster} from 'react-hot-toast';
const AddAdmin = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');
    const [alladmin,setallAdmin] = useState([]);
    const [viewpassword,setViewpassword] = useState(false);
    const fetchadmin = async () => {
        const data = { status: "getalldata"};
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/admincontrol`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        if (result.success) {
          setallAdmin(result.data)
        } else {
          toast.error(result.message);
        }
    }

    useEffect(() => {
        fetchadmin();
    },[])

    const handleChanges = (e) => {
        if(e.target.name=="name"){
            setName(e.target.value)
        }
        if(e.target.name=="email"){
            setEmail(e.target.value)
        }
        if(e.target.name=="phone"){
            setPhone(e.target.value)
        }
        if(e.target.name=="password"){
            setPassword(e.target.value)
        }
    }
    const handleSubmit = async (e) => {
     e.preventDefault();
     console.log(name,email,phone,password)
     if(name=="" || email=="" || phone=="" || password==""){
         toast.error("Please fill all the fields");
     }
     else{
        const data = { name, email, phone, password};
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/admin/adminsignup`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await res.json();
        if (result.success) {
          toast.success(result.message);
            fetchadmin();
          setName("");
          setEmail("");
          setPhone("");
          setPassword("");
        } else {
          toast.error(result.message);
        }
     }

    }
    //handle delete admin
    const handleDelete = async (id) => {
        let a  = prompt("Are you sure you want to delete this admin? Type password to confirm");
        if(a == "752050"){
            const data = { status: "delete",id};
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_HOST}/api/admin/admincontrol`,
              {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            );
            const result = await res.json();
            if (result.success) {
              toast.success(result.message);
              fetchadmin();
            } else {
              toast.error(result.message);
            }
        }
        else{
            toast.error("Wrong password");
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
        <Toaster position='top-center'/>
       <section className="font-poppins ">
  <div className="hidden py-20 text-center bg-blue-100 dark:bg-gray-700 lg:block">
    <div className="max-w-6xl mx-auto mb-24">
      <span className="inline-block text-base font-medium text-red-600 dark:text-blue-300">
        Welcome Back
      </span>
      <h2 className="mb-6 font-semibold text-gray-800 text-7xl dark:text-gray-300">
        Create a new Admin
      </h2>
      <p className="mb-6 text-xl text-gray-500 ">
        Hii, create a new admin to manage the website.
      </p>
    </div>
  </div>
  <div className="max-w-xl mx-auto ">
    <div className="w-full shadow-lg bg-gray-50 dark:bg-gray-800 mt-11 lg:-mt-36 lg:full p-7 rounded-3xl">
     
      <div className="">
        <form  className="p-0 m-0" onSubmit={handleSubmit}>
        <div className="mb-7">
            <input
              type="name"
              className="w-full px-4 py-4 bg-gray-200 rounded-lg dark:bg-gray-700 lg:py-5 dark:text-gray-300 "
              name="name"
                onChange={handleChanges}
                value={name}
              placeholder="Enter your Admin Name"
            />
          </div>
          <div className="mb-7">
            <input
              type="email"
              className="w-full px-4 py-4 bg-gray-200 rounded-lg dark:bg-gray-700 lg:py-5 dark:text-gray-300 "
              name="email"
                onChange={handleChanges}
              placeholder="Enter your Admin email"
            />
          </div>
          <div className="mb-7">
            <input
              type="number"
              className="w-full px-4 py-4 bg-gray-200 rounded-lg dark:bg-gray-700 lg:py-5 dark:text-gray-300 "
              name="phone"
              value={phone}
                onChange={handleChanges}
              placeholder="Enter your Admin phone number"
            />
          </div>
          <div className="mb-6">
            <div className="relative flex items-center">
              <input
                type={viewpassword ? "text" : "password"}
                className="w-full px-4 py-4 bg-gray-200 rounded-lg lg:py-5 dark:text-gray-300 dark:bg-gray-700 "
                name="password"
                onChange={handleChanges}
                placeholder="Enter password"
              />
             { <svg
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={16}
                className="absolute right-0 mr-3 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 16 16"
                onClick={() => setViewpassword(!viewpassword)}
              >
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
              </svg>}
            </div>
          </div>
        
          <button
            className="w-full px-4 py-4 mt-6 font-medium text-gray-200 bg-blue-700 rounded-lg dark:bg-blue-500 hover:text-blue-200 "
            type="submit"
          >
            Create a new Admin
          </button>
          
          
        </form>
      </div>
    </div>
  </div>
</section>
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
                          Admins
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Add admins, edit and more.
                        </p>
                      </div>
                      {/* <div>
                        <input
                          type="search"
                          className="p-2 border-2 border-gray-300 rounded-lg w-96"
                          placeholder="Search for Name"
                          onChange={handleChange}
                          name="search"
                          aria-autocomplete="none"
                          value={searchq}
                        />
                      </div> */}
                      <div>
                        <div className="inline-flex gap-x-2">
                          {/* <button
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
                          </button> */}
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
                                Email
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
                                Created
                              </span>
                            </div>
                          </th>
                          <th scope="col" className="px-6 py-3 text-end" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        

                        {
                          alladmin.map((item) => (
                            <tr key={item._id}>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 py-3"></div>
                              </td>
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="ps-6 lg:ps-3 xl:ps-0 pe-6 py-3">
                                  <div className="flex items-center gap-x-3">
                                    <img
                                      className="inline-block h-[2.375rem] w-[2.375rem] rounded-full"
                                      src={`${item.img != "" ? item.img : "https://res.cloudinary.com/dst73auvn/image/upload/v1705769406/no-image-icon-23483_ycipvd.png"}`}
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
                              
                              <td className="h-px w-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="py-1 px-1.5 inline-flex items-center gap-x-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full dark:bg-yellow-500/10 dark:text-yellow-500">
                                    {item.email}
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
                                    className="inline-flex items-center gap-x-1 text-sm text-red-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                    onClick={() =>handleDelete(item._id)
                                    }
                                  >
                                    Delete
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
                            {alladmin.length}
                          </span>{" "}
                          results
                        </p>
                      </div>
                      <div>
                        <div className="inline-flex gap-x-2">
                          {/* <button
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
                          </button> */}
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
       </FullLayout>
      </ThemeProvider> 
 
  )
}

export default AddAdmin
