
"use client"
import { MessageCircle, Users, Cloud, Settings, Briefcase, Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/Mod/ModeTogger"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavigationStripProps {
    onToggleMobileSidebar?: () => void
}

export function SiderBar({ onToggleMobileSidebar }: NavigationStripProps) {
    return (
        <TooltipProvider>
            <div className="w-full bg-blue-500 flex flex-col items-center py-4 space-y-4 shadow-lg">
                <div className="lg:hidden w-full px-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleMobileSidebar}
                        className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>

                {/* User Avatar */}
                <div className="relative group">
                    <Avatar className="w-10 h-10 border-2 border-sidebar-border shadow-lg transition-transform group-hover:scale-105">
                        <AvatarImage src="/placeholder.svg?height=40&width=40&text=U" />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm">
                            U
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-sidebar shadow-lg rounded-full cursor-pointer"></div>
                </div>

                {/* Navigation Icons */}
                <div className="flex flex-col space-y-3 w-full cursor-pointer px-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl bg-sidebar-accent/50 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                </Button>
                                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 h-5 min-w-5 rounded-full cursor-pointer flex items-center justify-center shadow-lg border-0">
                                    3
                                </Badge>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Tin nhắn</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Phone className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Cuộc gọi</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Users className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Danh bạ</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Cloud className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Cloud của tôi</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Briefcase className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Zalo OA</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto flex flex-col space-y-3 w-full cursor-pointer px-2">
                    {/* Theme Toggle */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div>
                                <ModeToggle />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Chuyển đổi giao diện</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Settings */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full cursor-pointer text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground p-3 rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Settings className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="hidden lg:block">
                            <p>Cài đặt</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    )
}
