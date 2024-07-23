import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  console.log('middleware')
};



export const config = {
  matcher: "/:path*",
};
