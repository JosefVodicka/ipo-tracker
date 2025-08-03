import { NextRequest } from "next/server"
import { db } from "@/lib/services/db"
import { createIPOSchema } from "@/lib/validations/ipo"
import { successResponse, errorResponse, validationErrorResponse } from "@/lib/api-response"
import { getToken } from "next-auth/jwt"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

export async function GET() {
  try {
    const ipos = await db.getIPOs()
    return successResponse(ipos)
  } catch {
    return errorResponse("Failed to fetch IPOs")
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    if (!token) {
      return errorResponse("Unauthorized", 401)
    }

    const json = await request.json()
    const data = createIPOSchema.parse(json)
    
    // Verify company exists
    const company = await db.getCompanyBySymbol(data.companyId)
    if (!company) {
      return errorResponse("Company not found", 404)
    }

    const ipo = await prisma.iPO.create({
      data: {
        ...data,
        companyId: company.id
      },
      include: {
        company: true
      }
    })

    return successResponse(ipo)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return validationErrorResponse(err as z.ZodError)
    }
    return errorResponse("Failed to create IPO")
  }
} 