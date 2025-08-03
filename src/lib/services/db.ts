import { prisma } from "@/lib/prisma"

export const db = {
  // IPO queries
  getIPOs: async () => {
    return prisma.iPO.findMany({
      include: { company: true },
      orderBy: { expectedDate: "asc" }
    })
  },

  getIPOById: async (id: string) => {
    return prisma.iPO.findUnique({
      where: { id },
      include: { company: true }
    })
  },

  getUpcomingIPOs: async () => {
    return prisma.iPO.findMany({
      where: { status: "UPCOMING" },
      include: { company: true },
      orderBy: { expectedDate: "asc" }
    })
  },

  // Watchlist queries
  getUserWatchlist: async (userId: string) => {
    return prisma.watchlist.findMany({
      where: { userId },
      include: {
        ipo: {
          include: { company: true }
        }
      }
    })
  },

  addToWatchlist: async (userId: string, ipoId: string, notes?: string) => {
    return prisma.watchlist.create({
      data: {
        userId,
        ipoId,
        notes
      },
      include: {
        ipo: {
          include: { company: true }
        }
      }
    })
  },

  removeFromWatchlist: async (userId: string, ipoId: string) => {
    return prisma.watchlist.delete({
      where: {
        userId_ipoId: {
          userId,
          ipoId
        }
      }
    })
  },

  // Company queries
  getCompanyBySymbol: async (symbol: string) => {
    return prisma.company.findUnique({
      where: { symbol },
      include: { ipos: true }
    })
  },

  searchCompanies: async (query: string) => {
    return prisma.company.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { symbol: { contains: query, mode: "insensitive" } }
        ]
      },
      include: { ipos: true }
    })
  }
} 