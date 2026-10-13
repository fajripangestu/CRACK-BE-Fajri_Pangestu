// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const role = token ? JSON.parse(atob(token.split('.')[1])).role : null;

  if (req.nextUrl.pathname.startsWith("/dashboard/superadmin") && role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard/user", req.url));
  }
}