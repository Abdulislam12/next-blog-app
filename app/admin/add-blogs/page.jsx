'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddBlogs = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: '',
    description: '',
    category: 'Startup',
    author: 'Alex Bennett',
    authorImg: '/author_img.png',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('author', data.author)
    formData.append('authorImg', data.authorImg)
    formData.append('image', image)

    try {
      const response = await axios.post('/api/blogs', formData)

      if (response.data.success) {
        toast.success(response.data.msg)
        setImage(false)
        setData(
          {
            title: '',
            description: '',
            category: 'Startup',
            author: 'Alex Bennett',
            authorImg: '/author_img.png',
          }
        )
      } else {
        toast.error('Something went wrong on the server')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload blog')
    }
  }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor='image'>
          <Image
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt='Upload Thumbnail'
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type='file'
          hidden
          id='image'
          required
        />

        <p className='text-xl mt-4'>Blog Title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={data.title}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          type='text'
          placeholder='Type Here'
          required
        />

        <p className='text-xl mt-4'>Blog Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={data.description}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          placeholder='Write Content Here'
          required
        />

        <p className='text-xl mt-4'>Blog Category</p>
        <select
          name='category'
          onChange={onChangeHandler}
          value={data.category}
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value='Startup'>Startup</option>
          <option value='Technology'>Technology</option>
          <option value='Lifestyle'>Lifestyle</option>
        </select>

        <br />
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>
          ADD
        </button>
      </form>
    </>
  )
}

export default AddBlogs
