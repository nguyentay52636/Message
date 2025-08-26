
"use client"
import ChatTabsBar from "./ChatTabsBar"
import ChatFilterSearch from "./ChatFilterSearch"
import HeaderTitle from "./HeaderTitle"
import { ChatUser } from "@/lib/Mock/dataMock"
import { IUser } from "@/types/types"

interface ChatHeaderProps {
  activeTab: "all" | "unread"
  setActiveTab: (tab: "all" | "unread") => void
  user: ChatUser
  onToggleMobileSidebar?: () => void
  onSelectUser?: (u: IUser) => void
}

export function ChatListHeader({ activeTab, setActiveTab, user, onToggleMobileSidebar, onSelectUser }: ChatHeaderProps) {
  return (
    <div className="p-3 sm:p-4 border-b bg-card border-border">
      <HeaderTitle />
      <ChatFilterSearch onSelectUser={onSelectUser} />
      <ChatTabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
