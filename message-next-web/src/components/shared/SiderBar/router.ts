import { MessageCircle, Phone, Users, Cloud, Briefcase } from "lucide-react"
import type React from "react"

export type MenuItem = {
    label: string
    icon: React.ComponentType<{ className?: string }>
    onClick?: () => void
    badge?: number | string
}

type RouterLike = { push: (href: string) => void }

export const createMenuItems = (router: RouterLike): MenuItem[] => {
    return [
    {
        label: "Tin nhắn",
        icon: MessageCircle,
        onClick: () => router.push("/strager-chat"),
        badge: 10,
    },
    {
        label: "Cuộc gọi",
        icon: Phone,
    },
    {
        label: "Danh bạ",
        icon: Users,
        onClick: () => router.push("/friends"),
    },
    {
        label: "Cloud của tôi",
        icon: Cloud,
    },
    {
        label: "Zalo OA",
        icon: Briefcase,
    },
    ]
}