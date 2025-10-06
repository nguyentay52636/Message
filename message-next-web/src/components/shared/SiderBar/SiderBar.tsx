
"use client"
import { MessageCircle, Users, Cloud, Settings, Briefcase, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/Mod/ModeTogger"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
import { UserDropdown } from "./UserDropdown"
import { useRouter } from "next/navigation"
import SiderBarItem from "./components/SiderBarItem"

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
            <div className=" h-full w-17! bg-blue-600 flex flex-col items-center py-2 sm:py-4 space-y-2 sm:space-y-4 shadow-lg ">
                {/* User Avatar */}
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

                {/* Bottom Actions */}
                <div className="mt-auto flex flex-col space-y-2 sm:space-y-3 w-full cursor-pointer px-2">
                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex justify-center">
                                <ModeToggle />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Chuyển đổi giao diện</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Settings */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => router.push("/settings")}
                                variant="ghost"
                                size="sm"
                                className="w-full px-[30px]! cursor-pointer p-2! text-white! hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Settings className="w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Cài đặt</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider >
    )
}
