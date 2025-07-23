'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import axios from 'axios'

export default function AuthGuard({ children }) {
  const [loading, setLoading] = useState(true)
  const [userRole, setUserRole] = useState(null)
  const router = useRouter()
  const pathname = usePathname()

  // Public routes that don't require login
  const publicRoutes = ['/login', '/register']

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (publicRoutes.includes(pathname)) {
          setLoading(false)
          return
        }
        const res = await axios.get('/api/me')

        const role = res.data.role
        setUserRole(role)


        if (pathname.startsWith('/admin') && role !== 'admin') {
          router.push('/') // Redirect non-admin users away from admin pages
          return
        }

        setLoading(false)
      } catch (err) {
        // Not authenticated or error, redirect to login (except for public routes)
        if (!publicRoutes.includes(pathname)) {
          router.push('/login')
        } else {
          setLoading(false)
        }
      }
    }

    checkAuth()
  }, [pathname, router])

  if (loading) return <div className="text-center p-10">Checking authentication...</div>

  return children
}
