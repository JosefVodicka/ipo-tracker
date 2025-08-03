import { NextResponse } from "next/server"
import { ZodError } from "zod"

export type ApiResponse<T> = {
  data?: T
  error?: string
  errors?: Record<string, string[]>
}

export function successResponse<T>(data: T): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data })
}

export function errorResponse(
  message: string,
  status: number = 400
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    { error: message },
    { status }
  )
}

export function validationErrorResponse(
  error: ZodError
): NextResponse<ApiResponse<never>> {
  const errors: Record<string, string[]> = {}
  
  error.errors.forEach((err) => {
    const path = err.path.join(".")
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(err.message)
  })

  return NextResponse.json(
    { errors },
    { status: 400 }
  )
}

export function unauthorizedResponse(): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    { error: "Unauthorized" },
    { status: 401 }
  )
} 