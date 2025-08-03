import { format, formatDistance, formatRelative, isValid } from "date-fns"

export const formatDate = (date: Date | string | number) => {
  const d = new Date(date)
  return isValid(d) ? format(d, "PPP") : "Invalid Date"
}

export const formatDateTime = (date: Date | string | number) => {
  const d = new Date(date)
  return isValid(d) ? format(d, "PPP p") : "Invalid Date"
}

export const formatRelativeTime = (date: Date | string | number) => {
  const d = new Date(date)
  return isValid(d) ? formatDistance(d, new Date(), { addSuffix: true }) : "Invalid Date"
}

export const formatRelativeTimeVerbose = (date: Date | string | number) => {
  const d = new Date(date)
  return isValid(d) ? formatRelative(d, new Date()) : "Invalid Date"
}

export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime())
}

export const toISODateString = (date: Date) => {
  return isValidDate(date) ? date.toISOString().split("T")[0] : null
}

export const fromISODateString = (dateString: string) => {
  const date = new Date(dateString)
  return isValidDate(date) ? date : null
} 