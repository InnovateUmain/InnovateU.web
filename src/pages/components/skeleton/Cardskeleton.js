import React from 'react'

const Cardskeleton = () => {
  return (
    <div>
      <section className="bg-gray-900 ">
  <div className="container px-6 py-10 mx-auto animate-pulse">
    <h1 className="w-48 h-2 mx-auto  rounded-lg bg-gray-700" />
    <p className="w-64 h-2 mx-auto mt-4  rounded-lg bg-gray-700" />
    <p className="w-64 h-2 mx-auto mt-4  rounded-lg sm:w-80 bg-gray-700" />
    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
      <div className="w-full ">
        <div className="w-full h-64  rounded-lg md:h-72 bg-gray-600" />
        <h1 className="w-56 h-2 mt-4  rounded-lg bg-gray-700" />
        <p className="w-24 h-2 mt-4  rounded-lg bg-gray-700" />
      </div>
      <div className="w-full ">
        <div className="w-full h-64  rounded-lg md:h-72 bg-gray-600" />
        <h1 className="w-56 h-2 mt-4  rounded-lg bg-gray-700" />
        <p className="w-24 h-2 mt-4 rounded-lg bg-gray-700" />
      </div>
      <div className="w-full ">
        <div className="w-full h-64  rounded-lg md:h-72 bg-gray-600" />
        <h1 className="w-56 h-2 mt-4  rounded-lg bg-gray-700" />
        <p className="w-24 h-2 mt-4  rounded-lg bg-gray-700" />
      </div>
    </div>
  </div>
</section>

    </div>
  )
}

export default Cardskeleton
