import { ApiResponse } from "@/types/api"
import { ZodError, ZodIssue } from "zod"

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 400,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ApiError"
  }
}

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError
}

export const handleApiError = (error: unknown): ApiResponse<never> => {
  if (error instanceof ZodError) {
    const errors: Record<string, string[]> = {}
    error.issues.forEach((err: ZodIssue) => {
      const path = err.path.join(".")
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(err.message)
    })
    return { errors }
  }

  if (error instanceof ApiError) {
    if (error.errors) {
      return { errors: error.errors }
    }
    return { error: error.message }
  }

  if (error instanceof Error) {
    return { error: error.message }
  }

  return { error: "An unexpected error occurred" }
}

export const createApiError = (message: string, statusCode?: number) => {
  throw new ApiError(message, statusCode)
}

export const assertApiError = (
  condition: unknown,
  message: string,
  statusCode: number = 400
): asserts condition => {
  if (!condition) {
    throw new ApiError(message, statusCode)
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "An unexpected error occurred"
} 