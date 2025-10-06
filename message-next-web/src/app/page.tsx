"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiderBar } from "@/components/shared/SiderBar/SiderBar"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"

export default function Home() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useSelector(selectAuth)

  // useEffect(() => {
  //   router.push('/auth/login')
  // }, [router])

  return (
    <div className="w-20 flex-shrink-0 z-30">
      {/* {!isAuthenticated && (
  
      )} */}
 


    </div>
  )
}