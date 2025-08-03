import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/auth/signin" || 
                      path === "/auth/signup" ||
                      path.startsWith("/api/companies") ||
                      path.startsWith("/api/ipos") && request.method === "GET"

  if (isPublicPath) {
    return NextResponse.next()
  }

  const token = await getToken({ req: request })

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

// Configure paths that should be protected
export const config = {
  matcher: [
    "/api/watchlist/:path*",
    "/api/ipos/:path*",
    "/api/companies/:path*",
  ]
} 