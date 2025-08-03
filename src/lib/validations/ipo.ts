import { z } from "zod"
import { IPOStatus } from "@prisma/client"

export const createIPOSchema = z.object({
  companyId: z.string(),
  expectedDate: z.string().transform((str) => new Date(str)),
  priceRangeLow: z.number().optional(),
  priceRangeHigh: z.number().optional(),
  shares: z.number().optional(),
  exchange: z.string().optional(),
  underwriters: z.array(z.string()).optional(),
  filingDate: z.string().transform((str) => new Date(str)).optional(),
  offeringType: z.string().optional(),
})

export const updateIPOSchema = z.object({
  expectedDate: z.string().transform((str) => new Date(str)).optional(),
  priceRangeLow: z.number().optional(),
  priceRangeHigh: z.number().optional(),
  finalPrice: z.number().optional(),
  shares: z.number().optional(),
  marketCap: z.number().optional(),
  status: z.nativeEnum(IPOStatus).optional(),
  exchange: z.string().optional(),
  underwriters: z.array(z.string()).optional(),
  filingDate: z.string().transform((str) => new Date(str)).optional(),
  offeringType: z.string().optional(),
})

export const createCompanySchema = z.object({
  name: z.string().min(1),
  symbol: z.string().min(1),
  description: z.string().optional(),
  industry: z.string().optional(),
  founded: z.number().optional(),
  ceo: z.string().optional(),
  website: z.string().url().optional(),
})

export const watchlistSchema = z.object({
  ipoId: z.string(),
  notes: z.string().optional(),
}) 