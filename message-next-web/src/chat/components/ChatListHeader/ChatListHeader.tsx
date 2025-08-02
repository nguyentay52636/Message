
"use client"
import ChatTabsBar from "./ChatTabsBar"
import ChatFilterSearch from "./ChatFilterSearch"
import HeaderTitle from "./HeaderTitle"
import { ChatUser } from "@/lib/Mock/dataMock"

interface ChatHeaderProps {
  activeTab: "all" | "unread"
  setActiveTab: (tab: "all" | "unread") => void
  user: ChatUser
  onToggleMobileSidebar?: () => void
}

export function ChatListHeader({ activeTab, setActiveTab, user, onToggleMobileSidebar }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b bg-card border-border">

      <HeaderTitle />
      <ChatFilterSearch />
      <ChatTabsBar activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  )
}
