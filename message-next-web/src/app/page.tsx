"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiderBar } from "@/components/shared/SiderBar/SiderBar"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to auth page on component mount
    router.push('/auth')
  }, [router])

  // Show loading while redirecting
  return (
    <div className="w-20 flex-shrink-0 z-30">
      <SiderBar />
    </div>
  )
}