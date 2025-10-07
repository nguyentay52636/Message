
"use client"
import ChatTabsBar from "./ChatTabsBar"
import ChatFilterSearch from "./ChatFilterSearch"
import HeaderTitle from "./HeaderTitle"
import { IFriendDisplay, IUser } from "@/types/types"

interface ChatHeaderProps {
  activeTab: "all" | "unread"
  setActiveTab: (tab: "all" | "unread") => void
  user: IUser
  friends: IFriendDisplay[]
  loadingFriends: boolean
  onToggleMobileSidebar?: () => void
  onSelectUser?: (u: IUser) => void
}

export function ChatListHeader({ activeTab, setActiveTab, user, friends, loadingFriends, onToggleMobileSidebar, onSelectUser }: ChatHeaderProps) {
  return (
    <div className="p-3 sm:p-4 border-b bg-card border-border">
      <HeaderTitle user={user} />
      <ChatFilterSearch friends={friends} loadingFriends={loadingFriends} onSelectUser={onSelectUser} />
      <ChatTabsBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
