'use client'
import SubsTableItem from '@/Components/SubsTableItem'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const Subscriptions = () => {
  const [emails, setEmails] = useState([])

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email")
      setEmails(response.data.emails)
    } catch (error) {
      console.error("Error fetching emails:", error)
    }
  }

  const deleteEmails = async (mongoID) => {
    try {
      const response = await axios.delete("/api/email", {
        params: { id: mongoID }
      })
      if (response.data.success) {
        toast.success(response.data.msg)
        fetchEmails()
      } else {
        toast.error("Error")
      }
    } catch (error) {
      console.log("Error deleting Emails:", error)
    }
  }

  useEffect(() => {
    fetchEmails()
  }, [])

  return (
    <div className='flex-1 pt-5 px-4 sm:px-6 md:px-10 lg:pl-[220px]'>
      <h1 className='text-lg sm:text-xl font-semibold mb-4'>All Subscriptions</h1>

      <div className='relative w-full max-w-full md:max-w-[700px] h-[70vh] overflow-x-auto border border-gray-400 rounded'>
        <table className='min-w-full text-sm text-gray-600'>
          <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='px-4 py-3'>Email</th>
              <th scope='col' className='px-4 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              emails.map((item, index) => (
                <SubsTableItem
                  key={index}
                  mongoID={item._id}
                  email={item.email}
                  deleteEmails={deleteEmails}
                />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Subscriptions
