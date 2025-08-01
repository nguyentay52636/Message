
import { Search, Users, UserPlus, ChevronDown, MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ChatListHeaderProps {
  activeTab: "all" | "unread"
  setActiveTab: (tab: "all" | "unread") => void
}

export function TabBar({ activeTab, setActiveTab }: ChatListHeaderProps) {
  return (
    <div className="p-4 border-b bg-card border-border">
      {/* Header Title */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-foreground">Tin nhắn</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <Plus className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm tin nhắn, bạn bè..."
          className="pl-10 pr-12 border-0 focus:ring-2 focus:ring-ring rounded-xl h-10 text-sm bg-muted text-foreground placeholder:text-muted-foreground focus:bg-background focus:shadow-md"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
          <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 rounded-full hover:bg-accent">
            <Users className="w-4 h-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-7 w-7 rounded-full hover:bg-accent">
            <UserPlus className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex">
          <button
            onClick={() => setActiveTab("all")}
            className={`py-2 px-0 mr-8 text-sm font-semibold border-b-2 transition-all ${activeTab === "all"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab("unread")}
            className={`py-2 px-0 text-sm font-semibold border-b-2 transition-all ${activeTab === "unread"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
          >
            Chưa đọc
          </button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-sm font-medium px-3 py-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
        >
          Phân loại
          <ChevronDown className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}
