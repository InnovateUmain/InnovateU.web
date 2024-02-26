import React from 'react'

const Testimonials = () => {
  return (
    <div className=''>
       <style jsx>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600&display=swap');
        .fontsponsor{
          font-family: 'Cabin', sans-serif;
        }
        `}
      </style>
      <div className='mx-6 flex justify-center items-center flex-col '>
        <h1 className='fontsponsor font-bold lg:text-5xl md:text-4xl text-4xl my-20 text-white'>Testimonials</h1>
        {/* <div className='h-2 w-56 bg-purple-600 rounded-full'></div> */}
      </div>
      <section>
      <>
  {/* Testimonials */}
  <div className="overflow-hidden ">
    <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      
      {/* End Title */}
      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card */}
        <div className="flex h-auto">
          <div className="flex flex-col  rounded-xl bg-slate-800">
            <div className="flex-auto p-4 md:p-6">
              <p className="text-base italic md:text-lg  text-gray-200">
              As the Managing Director of InnovateU, fostering collaboration with our team of innovators and providing essential resources has been a gratifying endeavor. Witnessing our collective efforts transform an idea into a tangible reality fills me with immense pride and joy. Investing my knowledge and expertise into this community has been incredibly rewarding, knowing that we're empowering aspiring developers and fostering a culture of innovation. I'm thrilled to have played a part in bringing this vision to life and look forward to the continued success and impact of InnovateU.
              </p>
            </div>
            <div className="p-4  rounded-b-xl md:px-7 bg-slate-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full sm:h-[2.875rem] sm:w-[2.875rem]"
                    src="https://res.cloudinary.com/dst73auvn/image/upload/v1705854744/qqwbakh2eqyjkkjjzhfo.png"
                    alt="Image Description"
                  />
                </div>
                <div className="grow ms-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-200">
                    Saneev Kumar Das
                  </p>
                  <p className="text-xs text-gray-400">
                    Asst.Professor | @CUTM 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
        {/* Card */}
        <div className="flex h-auto">
          <div className="flex flex-col rounded-xl bg-slate-800">
            <div className="flex-auto p-4 md:p-6">
              <p className="text-base italic md:text-lg text-gray-200">
              Founding and nurturing an open-source community has been an incredibly rewarding journey. Collaborating with the talented team at InnovateU was instrumental in bringing our vision to life. Together, we've created a dynamic platform that empowers new developers with hands-on projects and exposure to cutting-edge technologies. The experience has been nothing short of phenomenal, and I'm excited to see how our community continues to flourish and inspire the next generation of software developers.
              </p>
            </div>
            <div className="p-4  rounded-b-xl md:px-7 bg-slate-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full sm:h-[2.875rem] sm:w-[2.875rem]"
                    src="https://res.cloudinary.com/dst73auvn/image/upload/v1705910912/dpahrpch4gnkgnje7t4q.png"
                    alt="Image Description"
                  />
                </div>
                <div className="grow ms-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-200">
                    Animesh Singh
                  </p>
                  <p className="text-xs text-gray-400">
                     Lead Manager | @InnovateU
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
        {/* Card */}
        <div className="flex h-auto">
          <div className="flex flex-col  rounded-xl bg-slate-800">
            <div className="flex-auto p-4 md:p-6">
              <p className="text-base italic md:text-lg text-gray-200">
              As the Development Head at InnovateU, leading the creation of our open-source community platform has been an exciting journey. Collaborating with our dynamic team, we've not only built a platform but also fostered an environment where new developers can thrive. It's been fulfilling to work with passionate individuals who empower others in software development, inspiring the next generation of innovators. I'm proud of what we've achieved and eager to see our community's continued growth and impact.
              </p>
            </div>
            <div className="p-4  rounded-b-xl md:px-7 bg-slate-700">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full sm:h-[2.875rem] sm:w-[2.875rem]"
                    src="https://res.cloudinary.com/dst73auvn/image/upload/v1705863224/wxhjqh7u16zn9eqwgpuy.jpg"
                    alt="Image Description"
                  />
                </div>
                <div className="grow ms-3">
                  <p className="text-sm sm:text-base font-semibold text-gray-200">
                    Basir Khan
                  </p>
                  <p className="text-xs text-gray-400">
                   Lead Developer | @InnovateU
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Card */}
      </div>
      {/* End Grid */}
      {/* Grid */}
     </div>
  </div>
  {/* End Testimonials */}
</>

      </section>
    </div>
  )
}

export default Testimonials
