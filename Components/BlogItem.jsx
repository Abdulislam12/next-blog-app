import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assets } from '@/Assets/assets'

const BlogItem = ({ image, category, title, description, id }) => {
  return (
    <div className="w-full max-w-xs sm:max-w-sm bg-white border border-black hover:shadow-[-7px_7px_0px_#000] transition duration-200 ease-in-out">
      
      {/* Blog Image */}
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt="blog_image"
          width={400}
          height={400}
          className="w-full h-auto object-cover border-b border-black"
        />
      </Link>

      {/* Category */}
      <p className="ml-5 mt-5 px-2 py-0.5 inline-block bg-black text-white text-xs sm:text-sm rounded-sm">
        {category}
      </p>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h5 className="mb-2 text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </h5>
        <p className="mb-3 text-sm text-gray-700 line-clamp-3">
          {description}
        </p>

        {/* Read More */}
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center text-sm sm:text-base font-medium text-black hover:underline"
        >
          Read More
          <Image src={assets.arrow} alt="arrow icon" width={14} className="ml-2" />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
