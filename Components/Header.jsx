'use client'

import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Header = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const router = useRouter()

  // ✅ Fetch logged-in user's name
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("/api/me")
        if (res.data.username) {
          setUsername(res.data.username)
        }
      } catch (err) {
        console.log("User not logged in")
      }
    }

    getUser()
  }, [])

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      const res = await axios.post('/api/logout')
      if (res.status === 200) {
        toast.success('Logged out successfully')
        router.push('/login')
      } else {
        toast.error('Logout failed')
      }
    } catch (err) {
      toast.error('Something went wrong during logout')
    }
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/email", { email })
      if (response.data.success) {
        toast.success(response.data.msg)
        setEmail("")
      } else {
        toast.error("Error")
      }
    } catch (err) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      {/* Top Section: Logo + Username + Logout */}
      <div className='flex flex-wrap justify-between items-center gap-4'>
        <Image
          src={assets.logo}
          width={180}
          alt='blogger-logo'
          className='w-[130px] sm:w-auto'
        />

        <p className="text-sm sm:text-base font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded shadow">
          {username ? `👋 Welcome, ${username}` : 'Unknown User'}
        </p>


        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className='flex items-center gap-2 font-medium py-1 px-4 sm:px-6 border border-black shadow-[-7px_7px_0px_#000] text-sm sm:text-base'
        >
          Logout
          <Image src={assets.arrow} alt='arrow-icon' />
        </button>
      </div>

      {/* Title + Description */}
      <div className='text-center my-8 px-2'>
        <h1 className='text-2xl sm:text-4xl md:text-5xl font-semibold'>
          Latest Blogs
        </h1>
        <p className='mt-6 max-w-[740px] mx-auto text-xs sm:text-base text-gray-700'>
          Discover insights, stories, and tutorials from people like you.
        </p>

        {/* Email Form */}
        <form
          onSubmit={onSubmitHandler}
          className='flex flex-col sm:flex-row justify-between items-stretch max-w-[500px] w-full mx-auto mt-8 border border-gray-500 shadow-[-7px_7px_0px_#000] overflow-hidden'
        >
          <input
            type="email"
            placeholder='Enter Your Email'
            className='px-4 py-3 w-full text-sm outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type='submit'
            className='bg-white border-t sm:border-t-0 sm:border-l border-gray-500 px-4 py-3 sm:px-6 hover:bg-black hover:text-white transition duration-200 text-sm'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Header
