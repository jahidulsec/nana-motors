import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {

  const role = await crypto.subtle.digest('SHA-512', new TextEncoder().encode('admin'))
    const roleString = Buffer.from(role).toString('base64')
  

  if(!req.cookies.has('admin') && req.cookies.get('admin')?.value === roleString) {
    return NextResponse.redirect(new URL('/login', req.url))
  } else if(req.cookies.has('admin') && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

};



export const config = {
  matcher: ['/', '/payment/:path*', '/vehicle/:path*'],
};
