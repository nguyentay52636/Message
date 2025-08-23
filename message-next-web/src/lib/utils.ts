import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export function formatDate(dateString: string) {
  if (!dateString) return ""

  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Vừa xong"
  if (diffInHours < 24) return `${diffInHours} giờ trước`

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}
export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
 export const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (minutes < 60) {
      return `${minutes} phút trước`
  } else if (hours < 24) {
      return `${hours} giờ trước`
  } else {
      return `${days} ngày trước`
  }
}
  export const formatBirthday = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}
