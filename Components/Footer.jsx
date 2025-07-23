import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-black text-white py-6 px-4'>
      <div className='max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4'>

        {/* Logo */}
        <Image
          src={assets.logo_light}
          alt="Blogger light logo"
          width={120}
          className='w-[100px] sm:w-[120px]'
        />

        {/* Text */}
        <p className='text-xs sm:text-sm text-center'>
          © {new Date().getFullYear()} Blogger. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className='flex items-center gap-4'>
          <Image src={assets.facebook_icon} alt='facebook_icon' width={20} height={20} />
          <Image src={assets.twitter_icon} alt='twitter_icon' width={20} height={20} />
          <Image src={assets.googleplus_icon} alt='googleplus_icon' width={20} height={20} />
        </div>

      </div>
    </footer>
  )
}

export default Footer
