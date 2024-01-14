import React from 'react'
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { CiMicrophoneOn } from "react-icons/ci";
import { BsBuildingCheck } from "react-icons/bs";
import { useEffect } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { useRouter } from 'next/router';
import 'react-vertical-timeline-component/style.min.css';
const Eventdetails = () => {
    const [event, setEvent] = React.useState([]);
    const router = useRouter();
  const fetchEvents = async (id) => {
    const data = { status: "getbyid",id };
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
  }
  useEffect(() => {
    let id = router.query.id;
fetchEvents(id);
  }, [router.query])
  console.log(event)
  return (
    <div>
      <section className="py-10 font-poppins bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-700 via-blue-800 to-gray-900 my-20 mx-2 rounded-lg">
  <div className="max-w-6xl px-4 mx-auto">
    <div className="flex flex-wrap mb-24 -mx-4">
      <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
        <div className="sticky top-0 overflow-hidden ">
          <div className="relative mb-6 lg:mb-10 lg:h-96">
            <a
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
            </a>
            <img
              className="object-contain w-full lg:h-full"
              src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png"
              alt=""
            />
            <a
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
            </a>
          </div>
          <div className="flex-wrap hidden -mx-2 md:flex">
            <div className="w-1/2 p-2 sm:w-1/4">
              <a
                className="block border border-gray-200 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-300"
                href="#"
              >
                <img
                  className="object-contain w-full lg:h-28"
                  src="https://i.postimg.cc/Z5KhRkD6/download-1-removebg-preview.png"
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
                  src="https://i.postimg.cc/8kJBrw03/download-removebg-preview.png"
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
                  src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png"
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
                  src="https://i.postimg.cc/0N4Kk1PN/black-microprocessors-removebg-preview.png"
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
              <a
                className="mb-4 text-xs underline hover:text-blue-600 text-white lg:mb-0"
                href="#"
              >
                View the acer store
              </a>
            </div>
            <p className="inline-block text-2xl font-semibold text-gray-100 dark:text-gray-100 ">
              {/* <span>₹7,000.00</span> */}
              
              <span className='text-green-500 navfont'>₹ Free</span>
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
                        <CiCalendarDate className='bi bi-gpu-card w-8 h-8'/>
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
                        <IoMdTime className=' w-8 h-8'/>
                        </span>
                        <div>
                          <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Time & Duration
                          </p>
                          <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">
                           {event.eventdate} | {event.eventduration}
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="w-full mb-4 lg:mb-0 md:w-2/5">
                      <div className="flex ">
                        <span className="mr-3 text-gray-500 dark:text-gray-400">
                        <CiMicrophoneOn className=' w-8 h-8'/>
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
                        <BsBuildingCheck className=' w-8 h-8'/>
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
   Total Seats <span className="px-2 bg-blue-500 text-gray-50">26</span>
     {" "}for this event right now!{" "}
  </h2>
  <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
    Hurry up! left 23 seats.
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
    <div
      className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
      style={{ width: "45%" }}
    ></div>
  </div>
</div>

         
          
          <div className="flex gap-4 mb-6">
            <a
              href="#"
              className="w-full px-4 py-3 text-center text-gray-100 bg-blue-600 border border-transparent dark:border-gray-700 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-100 dark:text-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 rounded-xl"
            >
              Register Now
            </a>
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
            src="https://i.postimg.cc/QtyYkbxp/pexels-andrea-piacquadio-927022.jpg"
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
<div className='flex justify-center items-center my-4 flex-col'>
    <h1 className='navfont text-white text-4xl'>TimeLine</h1>
    <div className='h-1 w-40 text-purple-600 rounded-full bg-blue-800'></div>
</div>
<VerticalTimeline>
  <VerticalTimelineElement
    className="vertical-timeline-element--work "
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<CiCalendarDate />}
  >
    <h3 className="vertical-timeline-element-title navfont">Registration opens</h3>
    <h4 className="vertical-timeline-element-subtitle">Date & Time :- {event.eventdate} | {event.eventtime} </h4>
    <p>
    Welcome to {event.eventname} ! Get ready to kick off an exciting day of learning and networking.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<IoMdTime />}
  >
    <h3 className="vertical-timeline-element-title navfont">Opening ceremony</h3>
    <h4 className="vertical-timeline-element-subtitle">Date & Time : {event.eventdate} | {event.eventtime}</h4>
    <p>
    Join us for the official opening ceremony, where we set the stage for a day filled with insights, connections, and inspiration.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<CiMicrophoneOn/>}
  >
    <h3 className="vertical-timeline-element-title navfont">Keynote speaker/session</h3>
    <h4 className="vertical-timeline-element-subtitle">Date & Time :{event.eventdate} | {event.eventtime} </h4>
    <p>
    Immerse yourself in a thought-provoking session by our distinguished keynote speaker. Gain valuable insights and perspectives.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<BsBuildingCheck/>}
  >
    <h3 className="vertical-timeline-element-title navfont">Panel discussions</h3>
    <h4 className="vertical-timeline-element-subtitle">Date & Time : {event.eventdate} | {event.eventtime}</h4>
    <p>
    Engage in interactive panel discussions featuring industry experts. Explore current trends, challenges, and innovative solutions.
    </p>
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<CiCalendarDate />}
  >
    <h3 className="vertical-timeline-element-title navfont">FAQ & Open Questions</h3>
    <h4 className="vertical-timeline-element-subtitle">Date & Time : {event.eventdate} | {event.eventtime} </h4>
    <p>
    We love hearing from you! If you have any questions not covered here or if you are seeking more information, feel free to reach out. Our team is here to help.
    </p>
  
  </VerticalTimelineElement>
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    date={"12 Dec 2024"}
    iconStyle={{ background: 'rgb(42, 8, 156)', color: '#fff' }}
    icon={<CiCalendarDate />}
  >
    <h3 className="vertical-timeline-element-title navfont">Thank-you messages to sponsors and participants & Closing ceremony</h3>
    <h4 className="vertical-timeline-element-subtitle">Follow us on [Social Media Platforms] for real-time updates and engage with the community. Use the hashtag #{event.eventname} to join the conversation.

We look forward to welcoming you to {event.eventname} and making it an enriching experience for everyone! </h4>
  </VerticalTimelineElement>
 

</VerticalTimeline>
</section>

    </div>
  )
}

export default Eventdetails
