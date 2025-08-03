import { z } from "zod"

// Common API response types
export type ApiSuccessResponse<T> = {
  data: T
  error?: never
  errors?: never
}

export type ApiErrorResponse = {
  data?: never
  error: string
  errors?: never
}

export type ApiValidationErrorResponse = {
  data?: never
  error?: never
  errors: Record<string, string[]>
}

export type ApiResponse<T> = 
  | ApiSuccessResponse<T>
  | ApiErrorResponse
  | ApiValidationErrorResponse

// Common query parameters
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
})

export type PaginationParams = z.infer<typeof paginationSchema>

export const sortSchema = z.object({
  sortBy: z.string().optional(),
  order: z.enum(["asc", "desc"]).default("asc"),
})

export type SortParams = z.infer<typeof sortSchema>

// Common response metadata
export type PaginationMeta = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

export type PaginatedResponse<T> = {
  items: T[]
  meta: PaginationMeta
} 