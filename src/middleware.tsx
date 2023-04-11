// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // if user logged in, token will exist
  const token = await getToken ({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  // allow req if (1) token exist
  const {pathname} = request.nextUrl;

  if (token || pathname.includes('/api/auth') || pathname.includes('/_next')) {
    if (pathname === 'login') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next();
  }

  // Redirect user does not have a token AND (2) is req protected route
  if (!token && pathname != '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
