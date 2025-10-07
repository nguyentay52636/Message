
"use client"
import { MessageCircle, Users, Cloud, Settings, Briefcase, Phone } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
import { UserDropdown } from "./UserDropdown"
import { useRouter } from "next/navigation"
import SiderBarItem from "./components/SiderBarItem"
import BottomActions from "./components/BottomActions"

interface NavigationStripProps {
    onToggleMobileSidebar?: () => void
}

export function SiderBar({ onToggleMobileSidebar }: NavigationStripProps) {
    const { isAuthenticated, user } = useSelector(selectAuth)
    const router = useRouter();
    const menuItems = [
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

    return (
        <TooltipProvider>
            <div className=" h-full w-20! bg-blue-600 flex flex-col items-center py-2 sm:py-4 space-y-2 sm:space-y-4 shadow-lg ">
                <div className="relative group">
                    {
                        isAuthenticated && user && (
                            <UserDropdown user={user} />
                        )
                    }
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-blue-500 shadow-lg rounded-full cursor-pointer"></div>
                </div>

                <div className="flex flex-col sm:space-y-4 w-full cursor-pointer m-2 p-2! ">
                    {menuItems.map((item, index) => (
                        <SiderBarItem key={index} item={item} index={index} />
                    ))}
                </div>

                <BottomActions />

            </div>
        {/* Settings */}

        </TooltipProvider >
    )
}
