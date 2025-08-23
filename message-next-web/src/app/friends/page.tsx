"use client"

import { FriendsPage } from "@/components/friends/Friends"
import { useRouter } from "next/navigation"

export default function FriendsPageRoute() {
    const router = useRouter()

    const handleBack = () => {
        router.back()
    }

    return <FriendsPage onBack={handleBack} />
}
