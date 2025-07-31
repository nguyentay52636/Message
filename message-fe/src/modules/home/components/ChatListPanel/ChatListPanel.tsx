
import { Search, Users, UserPlus, ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatListHeaderProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isDarkMode: boolean;
}

export function ChatListPanel({ activeTab, setActiveTab, isDarkMode }: ChatListHeaderProps) {
    return (
        <div className={`p-4 border-b ${isDarkMode ? "bg-gray-800 border-gray-700 w-[400px!]" : "bg-white border-gray-200 w-[400px!]"}`}>
            <div className="flex items-center justify-between mb-4">
                <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Tin nhắn</h1>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 rounded-lg ${isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                    >
                        <Plus className="w-5 h-5" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`p-2 rounded-lg ${isDarkMode
                            ? "text-gray-300 hover:text-white hover:bg-gray-700"
                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Tìm kiếm tin nhắn, bạn bè..."
                    className={`pl-10 pr-12 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl h-10 text-sm transition-all ${isDarkMode
                        ? "bg-gray-700 text-white placeholder:text-gray-400 focus:bg-gray-600"
                        : "bg-gray-100 text-gray-700 placeholder:text-gray-400 focus:bg-white focus:shadow-md"
                        }`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`p-1.5 h-7 w-7 rounded-full ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                    >
                        <Users className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`p-1.5 h-7 w-7 rounded-full ${isDarkMode ? "hover:bg-gray-600" : "hover:bg-gray-200"}`}
                    >
                        <UserPlus className={`w-4 h-4 ${isDarkMode ? "text-gray-300" : "text-gray-500"}`} />
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between">
                <div className="flex">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`py-2 px-0 mr-8 text-sm font-semibold border-b-2 transition-all ${activeTab === "all"
                            ? (isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900")
                            : (isDarkMode ? "text-gray-300 hover:text-white border-transparent" : "text-gray-600 hover:text-gray-800 border-transparent")
                            }`}
                    >
                        Tất cả
                    </button>
                    <button
                        onClick={() => setActiveTab("unread")}
                        className={`py-2 px-0 text-sm font-semibold border-b-2 transition-all ${activeTab === "unread"
                            ? (isDarkMode ? "text-white border-white" : "text-gray-900 border-gray-900")
                            : (isDarkMode ? "text-gray-300 hover:text-white border-transparent" : "text-gray-600 hover:text-gray-800 border-transparent")
                            }`}
                    >
                        Chưa đọc
                    </button>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`text-sm font-medium px-3 py-1.5 rounded-lg ${isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-700"
                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        }`}
                >
                    Phân loại
                    <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}
