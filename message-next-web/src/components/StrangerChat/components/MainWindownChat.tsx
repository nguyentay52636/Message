"use client"

import { useState } from "react"
import MessageAreaWindownChat from "./MessageAreaWindownChat/MessageAreaWindownChat"
import InputWindownChat from "./InputWindownChat"
import InfoUserWindownChat from "./InfoUserWindownChat/InfoUserWindownChat"
import HeaderWindownChat from "./HeaderWindownChat"
import { IUser, IMessage } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Phone, Video, Search, MoreHorizontal, MessageCircle, Users, Settings } from "lucide-react"
import BubbleStartChat from "./BubbleStartChat"

interface MainWindownChatProps {
    messages: IMessage[]
    setSelectedChat: (chatId: string) => void
    selectedChat: string | null
    message: string
    setMessage: (message: string) => void
    onSendMessage: () => void
    recipientName: string
    user: IUser
    onToggleMobileSidebar?: () => void
    onBack?: () => void
    onConversationCreated?: (conversationId: string) => void
}

export function MainWindownChat({
    messages,
    setSelectedChat,
    selectedChat,
    message,
    setMessage,
    onSendMessage,
    recipientName,
    user,
    onToggleMobileSidebar,
    onBack,
    onConversationCreated
}: MainWindownChatProps) {
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [showChatBubble, setShowChatBubble] = useState(false)
    const [friendRequestStatus, setFriendRequestStatus] = useState<"pending" | "waiting" | "accepted">("waiting")

    const userForComponents = {
        id: user._id || user.username,
        name: user.username,
        avatar: user.avatar || "/placeholder.svg",
        isOnline: user.status === 'online'
    }

    // Convert IMessage to the format expected by MessageAreaWindownChat
    const strangerMessages = messages.map(msg => ({
        id: msg.id || '',
        content: msg.content || '',
        sender: msg.sender as "user" | "other",
        timestamp: msg.createdAt ? msg.createdAt.toISOString() : new Date().toISOString(),
        type: msg.messageType === "image" || msg.messageType === "file" || msg.messageType === "video" ? "text" : msg.messageType as "text" | "sticker",
        isRead: msg.isRead || false
    }))

    const handleSendMessage = () => {
        if (message.trim()) {
            // Call the parent's onSendMessage function
            onSendMessage()
        }
    }

    const handleSendFriendRequest = () => {
        setFriendRequestStatus("pending")
        // Simulate friend request being sent
        setTimeout(() => {
            setFriendRequestStatus("waiting")
        }, 1000)
        // console.log("Friend request sent to:", user.username)
    }

    const handleAcceptFriendRequest = () => {
        setFriendRequestStatus("accepted")
        // console.log("Friend request accepted for:", user.username)
    }

    const handleToggleInfo = () => {
        setShowInfoPanel(!showInfoPanel)
    }

    const handleToggleChatBubble = () => {
        setShowChatBubble(!showChatBubble)
        // console.log("Toggle chat bubble clicked")
    }

    return (
        <div className="h-full w-full flex flex-col bg-white border-2">

            <div className="flex-shrink-0">
                <HeaderWindownChat
                    user={user}
                    onBack={onBack}
                    onToggleInfo={handleToggleInfo}
                    onSendFriendRequest={handleSendFriendRequest}
                    onAcceptFriendRequest={handleAcceptFriendRequest}
                    showInfoPanel={showInfoPanel}
                    onToggleMobileSidebar={onToggleMobileSidebar}
                    onToggleChatBubble={handleToggleChatBubble}
                />
            </div>
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex-1 overflow-hidden">
                        <MessageAreaWindownChat messages={strangerMessages} user={userForComponents} />
                    </div>

                    <div className="flex-shrink-0">
                        <InputWindownChat
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                            recipientName={recipientName}
                            disabled={false}
                            conversationId={selectedChat}
                            recipientId={user._id}
                            onConversationCreated={onConversationCreated}
                        />
                    </div>
                </div>

                {showInfoPanel && (
                    <div className="hidden lg:block flex-shrink-0">
                        <InfoUserWindownChat user={userForComponents} onClose={() => setShowInfoPanel(false)} />
                    </div>
                )}
            </div>
            {showChatBubble && (
                <BubbleStartChat
                    handleToggleChatBubble={handleToggleChatBubble}

                />
            )}

            <div className="fixed bottom-6 right-6 z-40">
                <Button
                    onClick={handleToggleChatBubble}
                    className="w-12 h-12 rounded-full shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
                >
                    <MessageCircle className="w-5 h-5" />
                </Button>
            </div>
        </div>
    )
}
