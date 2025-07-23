import { NextResponse } from 'next/server'

// Manual base64 decode function
function parseJwt(token) {
  try {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64').toString()
    return JSON.parse(payload)
  } catch (err) {
    return null
  }
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  if (pathname.startsWith('/admin')) {
    if (!token) {
      console.log('❌ No token found, redirecting')
      return NextResponse.redirect(new URL('/', request.url))
    }

    const decoded = parseJwt(token)
    console.log('🧠 Decoded token:', decoded)

    if (!decoded || decoded.role?.toLowerCase().trim() !== 'admin') {
      console.log('❌ Not an admin, redirecting')
      return NextResponse.redirect(new URL('/', request.url))
    }

    // ✅ Role is admin — allow
    return NextResponse.next()
  }

  // Allow other routes
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
