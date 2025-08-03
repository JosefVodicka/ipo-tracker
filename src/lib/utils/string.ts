export const truncate = (str: string, length: number) => {
  if (str.length <= length) return str
  return str.slice(0, length) + "..."
}

export const capitalize = (str: string) => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const titleCase = (str: string) => {
  return str
    .split(" ")
    .map(word => capitalize(word))
    .join(" ")
}

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const unslugify = (slug: string) => {
  return titleCase(slug.replace(/-/g, " "))
}

export const generateInitials = (name: string) => {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const maskEmail = (email: string) => {
  const [username, domain] = email.split("@")
  const maskedUsername = `${username[0]}${"*".repeat(username.length - 2)}${
    username[username.length - 1]
  }`
  return `${maskedUsername}@${domain}`
}

export const normalizeString = (str: string) => {
  return str.trim().toLowerCase()
}

export const removeSpecialCharacters = (str: string) => {
  return str.replace(/[^a-zA-Z0-9 ]/g, "")
} 