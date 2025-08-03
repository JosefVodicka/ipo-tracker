import { NextRequest } from "next/server"
import { db } from "@/lib/services/db"
import { watchlistSchema } from "@/lib/validations/ipo"
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"
import { z } from "zod"

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token?.sub) {
      return errorResponse("Unauthorized", 401)
    }

    const watchlist = await db.getUserWatchlist(token.sub)
    return successResponse(watchlist)
  } catch (error) {
    return errorResponse("Failed to fetch watchlist")
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token?.sub) {
      return errorResponse("Unauthorized", 401)
    }

    const json = await request.json()
    const data = watchlistSchema.parse(json)

    const watchlistItem = await db.addToWatchlist(
      token.sub,
      data.ipoId,
      data.notes
    )

    return successResponse(watchlistItem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error as z.ZodError)
    }
    return errorResponse("Failed to add to watchlist")
  }
} 