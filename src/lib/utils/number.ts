const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat("en-US", {
  notation: "compact",
  compactDisplay: "short",
})

const PERCENT_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (num: number) => {
  return CURRENCY_FORMATTER.format(num)
}

export const formatNumber = (num: number) => {
  return NUMBER_FORMATTER.format(num)
}

export const formatCompactNumber = (num: number) => {
  return COMPACT_NUMBER_FORMATTER.format(num)
}

export const formatPercent = (num: number) => {
  return PERCENT_FORMATTER.format(num)
}

export const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1_000_000_000_000) {
    return `${(marketCap / 1_000_000_000_000).toFixed(2)}T`
  }
  if (marketCap >= 1_000_000_000) {
    return `${(marketCap / 1_000_000_000).toFixed(2)}B`
  }
  if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(2)}M`
  }
  return formatCurrency(marketCap)
}

export const calculatePercentChange = (current: number, previous: number) => {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

export const roundToDecimals = (num: number, decimals: number = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.round(num * factor) / factor
} 