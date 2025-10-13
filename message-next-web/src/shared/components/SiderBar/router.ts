import { MessageCircle, Phone, Users, Cloud, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

const router = useRouter()

export  const menuItems = [
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
];