
"use client"
import { MessageCircle, Users, Cloud, Settings, Briefcase, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/Mod/ModeTogger"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSelector } from "react-redux"
import { selectAuth } from "@/redux/slices/authSlice"
import { UserDropdown } from "./UserDropdown"

interface NavigationStripProps {
    onToggleMobileSidebar?: () => void
}

export function SiderBar({ onToggleMobileSidebar }: NavigationStripProps) {
    const { isAuthenticated, user } = useSelector(selectAuth)

    return (
        <TooltipProvider>
            <div className="w-16 h-full bg-blue-500 flex flex-col items-center py-2 sm:py-4 space-y-2 sm:space-y-4 shadow-lg">
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
                <div className="flex flex-col space-y-2 sm:space-y-3 w-full cursor-pointer px-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                                >
                                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 h-4 sm:h-5 min-w-4 sm:min-w-5 rounded-full cursor-pointer flex items-center justify-center shadow-lg border-0">
                                    3
                                </Badge>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Tin nhắn</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Cuộc gọi</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Danh bạ</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Cloud của tôi</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Zalo OA</p>
                        </TooltipContent>
                    </Tooltip>
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
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-white hover:bg-white/20 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden md:block">
                            <p>Cài đặt</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}
