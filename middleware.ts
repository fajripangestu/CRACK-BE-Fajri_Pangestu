import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // kalau tidak ada token, redirect ke login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // decode JWT untuk ambil role
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    if (req.nextUrl.pathname.startsWith("/dashboard/superadmin")) {
      if (payload.role !== "SUPER_ADMIN") {
        // kalau bukan superadmin, redirect ke dashboard sesuai role
        const redirectPath =
          payload.role === "ADMIN"
            ? "/dashboard/admin"
            : "/dashboard/user";

        return NextResponse.redirect(new URL(redirectPath, req.url));
      }
    }
  } catch (err) {
    console.error("Token decode error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Tentukan halaman mana saja yang diproteksi
export const config = {
  matcher: ["/dashboard/superadmin/:path*"],
};