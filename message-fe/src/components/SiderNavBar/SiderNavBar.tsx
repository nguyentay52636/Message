import { MessageCircle, Users, Cloud, Settings, Moon, Sun, Briefcase, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface NavigationStripProps {
    isDarkMode: boolean
    toggleTheme: () => void
}

export default function SiderNavBar({ isDarkMode, toggleTheme }: NavigationStripProps) {
    return (
        <div className="w-20 flex flex-col bg-gradient-to-b from-blue-600 to-blue-700 flex flex-col items-center py-6 space-y-6 shadow-lg">
            {/* User Avatar */}
            <div className="relative group">
                <Avatar className="w-10 h-10 border-3 border-white/20 shadow-lg transition-transform group-hover:scale-105">
                    <AvatarImage src="/placeholder.svg?height=40&width=40&text=U" />
                    <AvatarFallback className="bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm">
                        U
                    </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col space-y-4">
                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-all duration-200 group-hover:scale-105"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </Button>
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 h-6 min-w-6 rounded-full flex items-center justify-center shadow-lg">
                        3
                    </Badge>
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Tin nhắn
                    </div>
                </div>

                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                    >
                        <Phone className="w-5 h-5" />
                    </Button>
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Cuộc gọi
                    </div>
                </div>

                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                    >
                        <Users className="w-5 h-5" />
                    </Button>
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Danh bạ
                    </div>
                </div>

                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                    >
                        <Cloud className="w-5 h-5" />
                    </Button>
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Cloud
                    </div>
                </div>

                <div className="relative group">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                    >
                        <Briefcase className="w-5 h-5" />
                    </Button>
                    <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Zalo OA
                    </div>
                </div>
            </div>

            {/* Theme Toggle */}
            <div className="mt-auto mb-6 relative group">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                    className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                    title={isDarkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"}
                >
                    {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {isDarkMode ? "Sáng" : "Tối"}
                </div>
            </div>

            {/* Settings */}
            <div className="relative group">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 p-3 rounded-xl transition-all duration-200 group-hover:scale-105"
                >
                    <Settings className="w-5 h-5" />
                </Button>
                <div className="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Cài đặt
                </div>
            </div>
        </div>
    )
}
