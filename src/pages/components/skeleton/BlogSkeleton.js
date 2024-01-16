import React from 'react'

const BlogSkeleton = () => {
  return (
    <div>
      <>
  {/* HTML Structure */}
  <div className="min-h-screen bg-black text-white">
    <header className="bg-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="animate-pulse flex items-center space-x-4">
          <div className="h-12 w-12 bg-gray-600 rounded-full" />
          <div>
            <div className="h-4 w-20 bg-gray-600 rounded" />
            <div className="h-4 w-16 bg-gray-600 rounded mt-2" />
          </div>
        </div>
      </div>
    </header>
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded w-3/4" />
      </div>
      <div className="animate-pulse space-y-4 mt-12">
        <div className="h-4 bg-gray-700 rounded w-2/3" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded w-1/2" />
        <div className="h-4 bg-gray-700 rounded" />
        <div className="h-4 bg-gray-700 rounded" />
      </div>
    </div>
  </div>
</>

    </div>
  )
}

export default BlogSkeleton
