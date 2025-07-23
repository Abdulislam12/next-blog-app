'use client'
import BlogTableItem from '@/Components/AdminComponents/BlogTableItem'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const BlogList = () => {
  const [blogs, setBlogs] = useState([])

  const fetchData = async () => {
    const response = await axios.get("/api/blogs")
    setBlogs(response.data.blogs)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const deleteBlog = async (mongoId) => {
    const response = await axios.delete("/api/blogs/", {
      params: { id: mongoId }
    })
    toast.success(response.data.msg)
    fetchData()
  }

  return (
    <div className='flex-1 pt-5 px-4 sm:px-6 lg:px-12'>
      <h1 className='text-xl font-semibold mb-4'>All Blogs</h1>

      <div className="overflow-x-auto max-w-full border border-gray-300 rounded-md shadow-sm">
        <table className='w-full text-sm text-gray-600 min-w-[500px]'>
          <thead className='text-xs sm:text-sm text-gray-700 uppercase bg-gray-100'>
            <tr>
              <th className="hidden sm:table-cell px-4 py-3 text-left">Author Name</th>
              <th className="px-4 py-3 text-left">Blog Title</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            {
              blogs.map((item, index) => (
                <BlogTableItem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author.username} // ✅ fix here
                  authorImg={item.authorImg}
                  deleteBlog={deleteBlog}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BlogList
