import { IPO, Company, Watchlist, IPOStatus } from "@prisma/client"

export type { IPO, Company, Watchlist, IPOStatus }

export interface IPOWithCompany extends IPO {
  company: Company
}

export interface WatchlistWithIPO extends Watchlist {
  ipo: IPOWithCompany
}

export interface CompanyWithIPOs extends Company {
  ipos: IPO[]
} 