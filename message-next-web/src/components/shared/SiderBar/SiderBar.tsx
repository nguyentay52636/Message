
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
            <div className=" h-full bg-blue-600 flex flex-col items-center py-2 sm:py-4 space-y-2 sm:space-y-4 shadow-lg">
                {/* User Avatar */}
                <div className="relative group">
                    {
                        isAuthenticated && user && (
                            <UserDropdown user={user} />
                        )
                    }
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 border-2 border-blue-500 shadow-lg rounded-full cursor-pointer"></div>
                </div>

                {/* Navigation Icons */}
                <div className="flex flex-col sm:space-y-4 w-full cursor-pointer px-2! py-6!">
                    {menuItems.map((item, index) => (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild className="w-full">
                                <div className="relative !">
                                    <Button
                                        variant="ghost"
                                        onClick={item.onClick}
                                        className="w-full p-[30px]!  cursor-pointer text-white hover:bg-white/10 hover:text-white  p-4 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                                    >
                                        <item.icon className="w-[30px]! hover: h-[30px]! sm:w-10 sm:h-10" />
                                    </Button>

                                    {item.badge && (
                                        <Badge className="absolute -top-3 right-0 bg-red-500 text-white text-xs px-1 py-0.5 h-6 sm:h-5 min-w-4 sm:min-w-5 rounded-full cursor-pointer flex items-center justify-center shadow-lg border-0 px-2 py-4">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="hidden md:block">
                                <p>{item.label}</p>
                            </TooltipContent>
                        </Tooltip>
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
