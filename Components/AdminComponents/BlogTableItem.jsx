import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assets } from '@/Assets/assets'

const BlogTableItem = ({ authorImg, title, author, deleteBlog, mongoId }) => {
  return (
    <tr className="bg-white border-b text-sm sm:text-base">
      {/* Author Image & Name */}
      <td className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap">
        {authorImg ? (
          <Image
            src={assets.profile_icon}
            alt="Author"
            width={36}
            height={36}
            className="rounded-full w-8 h-8 sm:w-9 sm:h-9"
          />
        ) : null}
        <span className="text-gray-900">{author || 'Unknown'}</span>
      </td>

      {/* Blog Title */}
      <td className="px-4 py-3 sm:px-6 sm:py-4 text-blue-600 underline whitespace-nowrap">
        <Link href={`/admin/blog-list/${mongoId}`}>
          {title || 'No Title'}
        </Link>
      </td>

      {/* Delete Button */}
      <td className="px-4 py-3 sm:px-6 sm:py-4 text-red-600 cursor-pointer whitespace-nowrap" onClick={() => deleteBlog(mongoId)}>
        x
      </td>
    </tr>
  )
}

export default BlogTableItem
