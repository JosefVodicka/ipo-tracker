import { NextRequest } from "next/server"
import { db } from "@/lib/services/db"
import { updateIPOSchema } from "@/lib/validations/ipo"
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const ipo = await db.getIPOById(params.id)
    if (!ipo) {
      return errorResponse("IPO not found", 404)
    }
    return successResponse(ipo)
  } catch (error) {
    return errorResponse("Failed to fetch IPO")
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return errorResponse("Unauthorized", 401)
    }

    const json = await request.json()
    const data = updateIPOSchema.parse(json)

    const ipo = await prisma.iPO.update({
      where: { id: params.id },
      data,
      include: { company: true }
    })

    return successResponse(ipo)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return validationErrorResponse(error as z.ZodError)
    }
    return errorResponse("Failed to update IPO")
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return errorResponse("Unauthorized", 401)
    }

    await prisma.iPO.delete({
      where: { id: params.id }
    })

    return successResponse({ deleted: true })
  } catch (error) {
    return errorResponse("Failed to delete IPO")
  }
} 