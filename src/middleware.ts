import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  if(!req.cookies.has('admin')) {
    return NextResponse.redirect(new URL('/login', req.url))
  } 

};



export const config = {
  matcher: ['/', '/payment/:path*', '/vehicle/:path*'],
};
