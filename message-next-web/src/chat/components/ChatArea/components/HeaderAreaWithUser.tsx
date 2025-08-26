
"use client"

import { Video, Search, MoreHorizontal, Phone, Menu, Users, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { IUser } from "@/types/types"



interface ChatHeaderProps {
    user: IUser
    onToggleMobileSidebar?: () => void
    onBack?: () => void
}

export function HeaderAreaWithUser({ user, onToggleMobileSidebar, onBack }: ChatHeaderProps) {
    return (
        <div className="w-full bg-card border-b border-border shadow-sm">
            <div className="px-3 sm:px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    {onBack && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 hover:bg-accent rounded-xl flex-shrink-0"
                            onClick={onBack}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden p-2 hover:bg-accent rounded-xl flex-shrink-0"
                        onClick={onToggleMobileSidebar}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div className="relative flex-shrink-0">
                        <Avatar className="w-8 h-8 sm:w-10 sm:h-10 shadow-lg ring-2 ring-primary/20">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-500 text-primary-foreground font-bold text-sm">
                                {user.username.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        {user.status && (
                            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 border-2 border-background rounded-full"></div>
                        )}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                            <span className="font-bold text-sm sm:text-base truncate text-foreground">{user.username}</span>
                            {user._id === "1" && (
                                <Badge className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 font-semibold rounded-full flex-shrink-0 bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700/30">
                                    <span className="hidden sm:inline">89 thành viên</span>
                                    <span className="sm:hidden">89</span>
                                </Badge>
                            )}
                        </div>
                        {user.status && (
                            <div className="text-xs sm:text-sm text-green-600 dark:text-green-400 font-medium">Đang hoạt động</div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 sm:p-3 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 sm:p-3 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="hidden md:block p-2 sm:p-3 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 sm:p-3 rounded-xl transition-all hover:scale-105 text-muted-foreground hover:text-foreground hover:bg-accent"
                    >
                        <MoreHorizontal className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
