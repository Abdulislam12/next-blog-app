'use client'

import Image from "next/image";
import { assets } from "@/Assets/assets";
import React, { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="sm:hidden flex items-center justify-between bg-slate-100 border-b border-black px-4 py-3">
        <Image src={assets.logo} width={120} alt="logo" />
        <button
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="p-2 rounded-md border border-black focus:outline-none focus:ring"
        >
          {/* Hamburger Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              // Close icon
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-slate-100 border-r border-black
          w-64 transform transition-transform duration-300 ease-in-out
          sm:static sm:translate-x-0
          z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        `}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-black flex items-center justify-center sm:justify-start">
          <Image src={assets.logo} width={120} alt="logo" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
          <Link
            href="/admin/add-blogs"
            className="flex items-center gap-3 border border-black px-3 py-2 bg-white font-medium shadow-[-5px_5px_0px_#000] hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)} // close sidebar on mobile after click
          >
            <Image src={assets.add_icon} alt="add" width={24} height={24} />
            <span className="hidden sm:inline">Add Blogs</span>
          </Link>

          <Link
            href="/admin/blog-list"
            className="flex items-center gap-3 border border-black px-3 py-2 bg-white font-medium shadow-[-5px_5px_0px_#000] hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <Image src={assets.blog_icon} alt="blog list" width={24} height={24} />
            <span className="hidden sm:inline">Blog List</span>
          </Link>

          <Link
            href="/admin/subscriptions"
            className="flex items-center gap-3 border border-black px-3 py-2 bg-white font-medium shadow-[-5px_5px_0px_#000] hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            <Image src={assets.email_icon} alt="subscriptions" width={24} height={24} />
            <span className="hidden sm:inline">Subscription</span>
          </Link>
        </nav>
      </aside>

      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 sm:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;
