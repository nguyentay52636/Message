"use client"

import { useState, useEffect } from "react"
import { ChatUser, mockUsers } from "@/lib/Mock/dataMock"
import { ChatListHeader } from "../ChatListHeader/ChatListHeader"
import { IUser, IFriendDisplay } from "@/types/types"
import ChatListItem from "../ChatListItem"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/redux/store/store"
import { getAllFriendByUserId } from "@/apis/friendsApi"

interface ChatListSidebarProps {
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onToggleMobileSidebar?: () => void
    onSelectUser?: (u: IUser) => void
}



export function ChatListSidebar({ onChatSelect, selectedChat, onToggleMobileSidebar, onSelectUser }: ChatListSidebarProps) {
    const [activeTab, setActiveTab] = useState<"all" | "unread">("all")
    const [friends, setFriends] = useState<IFriendDisplay[]>([])
    const [loadingFriends, setLoadingFriends] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { isLoading, isAuthenticated, user } = useSelector((state: RootState) => state.auth)
    const allUsers = Object.values(mockUsers)
    const filteredUsers = activeTab === "unread"
        ? allUsers.filter((user) => user.unreadCount && user.unreadCount > 0)
        : allUsers

    // Fetch friends when component mounts and user is available
    useEffect(() => {
        const fetchFriends = async () => {
            if (user?.id || user?._id) {
                setLoadingFriends(true)
                try {
                    const userId = user.id || user._id
                    const friendsData = await getAllFriendByUserId(userId!)
                    setFriends(friendsData)
                } catch (error) {
                    console.error('Error fetching friends:', error)
                } finally {
                    setLoadingFriends(false)
                }
            }
        }

        fetchFriends()
    }, [user])

    const handleChatSelection = (chatId: string) => {
        console.log("Selecting chat:", chatId)
        onChatSelect(chatId)
    }

    return (
        <div className="w-full h-full flex flex-col bg-card">
            <div className="flex-shrink-0">
                <ChatListHeader
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    user={user}
                    friends={friends}
                    loadingFriends={loadingFriends}
                    onToggleMobileSidebar={onToggleMobileSidebar}
                    onSelectUser={onSelectUser}
                />
            </div>

            <div className="flex-1 overflow-y-auto">
                {filteredUsers.map((user: ChatUser, index: number) => (
                    <ChatListItem
                        key={user.id}
                        user={user}
                        activeTab={activeTab}
                        onChatSelect={onChatSelect}
                        selectedChat={selectedChat}
                        index={index}
                    />
                ))}
            </div>
        </div>
    )
}
