import { NextRequest } from "next/server"
import { db } from "@/lib/services/db"
import { successResponse, errorResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"

interface RouteParams {
  params: {
    ipoId: string
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const token = await getToken({ req: request })
    if (!token?.sub) {
      return errorResponse("Unauthorized", 401)
    }

    await db.removeFromWatchlist(token.sub, params.ipoId)
    return successResponse({ deleted: true })
  } catch (error) {
    return errorResponse("Failed to remove from watchlist")
  }
} 