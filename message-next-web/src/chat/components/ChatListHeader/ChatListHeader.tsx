
"use client"
import ChatTabsBar from "./ChatTabsBar"
import ChatFilterSearch from "./ChatFilterSearch"
import HeaderTitle from "./HeaderTitle"

interface ChatListHeaderProps {
  activeTab: "all" | "unread"
  setActiveTab: (tab: "all" | "unread") => void
}

export function ChatListHeader({ activeTab, setActiveTab }: ChatListHeaderProps) {
  return (
    <div className="p-4 border-b bg-card border-border">

      <HeaderTitle />
      <ChatFilterSearch />
      <ChatTabsBar activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  )
}
