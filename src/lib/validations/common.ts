import { z } from "zod"

// Common string validations
export const nonEmptyString = z.string().min(1, "This field cannot be empty")
export const email = z.string().email("Invalid email address")
export const password = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

// Common number validations
export const positiveNumber = z.number().positive("Must be a positive number")
export const nonNegativeNumber = z.number().min(0, "Must be zero or greater")
export const percentageNumber = z.number().min(0).max(100, "Must be between 0 and 100")

// Date validations
export const pastDate = z.date().max(new Date(), "Date must be in the past")
export const futureDate = z.date().min(new Date(), "Date must be in the future")

// URL validation
export const url = z.string().url("Invalid URL")

// Common object validations
export const timestamps = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
})

// Helper function to make any schema nullable
export const nullable = <T extends z.ZodTypeAny>(schema: T) => 
  z.union([schema, z.null()])

// Helper function to make any schema optional
export const optional = <T extends z.ZodTypeAny>(schema: T) => 
  z.union([schema, z.undefined()])

// Helper function to transform empty string to null
export const emptyStringToNull = z.string().transform(str => 
  str.trim() === "" ? null : str
)

// Helper function to transform string to number
export const stringToNumber = z.string().transform((str, ctx) => {
  const parsed = Number(str)
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Not a number",
    })
    return z.NEVER
  }
  return parsed
})

// Helper function to transform string to date
export const stringToDate = z.string().transform((str, ctx) => {
  const date = new Date(str)
  if (isNaN(date.getTime())) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid date format",
    })
    return z.NEVER
  }
  return date
}) 