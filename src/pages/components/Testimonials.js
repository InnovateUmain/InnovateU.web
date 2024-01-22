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
        <h1 className='fontsponsor font-bold lg:text-5xl md:text-4xl text-4xl my-4 text-white'>Testimonials</h1>
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
              The innovateU website is a collaborative oasis! The platform links developers all over the world with ease. Learning and sharing are enjoyable because of the encouraging group and the worthwhile projects I was able to participate in. 
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
                    Professor | @CUTM 
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
              Excellent work on the open-source community webpage! There are a ton of projects and prospects for collaboration there. Both novice and seasoned developers are encouraged to participate and progress together by the friendly environment and diversified community. 
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
          <div className="flex flex-col  rounded-xl bg-slate-900">
            <div className="flex-auto p-4 md:p-6">
              <p className="text-base italic md:text-lg text-gray-200">
              For me, finding this open-source community website was pivotal. The projects span a wide range of interests, and the collaborative spirit is contagious. This platform offers an ideal environment for learning and contributing, regardless of your level of experience.
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
