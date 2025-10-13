"use client"

import { useState } from "react"
import MessageAreaWindownChat from "./MessageAreaWindownChat"
import InputWindownChat from "./InputWindownChat"
import InfoUserWindownChat from "./InfoUserWindownChat/InfoUserWindownChat"
import HeaderWindownChat from "./HeaderWindownChat"
import { IUser } from "@/types/types"
import { Message } from "@/lib/Mock/dataMock"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import BubbleStartChat from "./BubbleStartChat"

interface MainWindownChatProps {
    messages: Message[]
    setSelectedChat: (chatId: string) => void
    selectedChat: string | null
    message: string
    setMessage: (message: string) => void
    onSendMessage: () => void
    recipientName: string
    user: IUser
    onToggleMobileSidebar?: () => void
    onBack?: () => void
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
    onBack
}: MainWindownChatProps) {
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [showChatBubble, setShowChatBubble] = useState(false)
    const [friendRequestStatus, setFriendRequestStatus] = useState<"pending" | "waiting" | "accepted">("waiting")

    const userForComponents = {
        id: user._id || user.username,
        name: user.username,
        avatar: user.avatar || "/placeholder.svg",
        isOnline: user.status === "online"
    }

    const strangerMessages = messages.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.sender as "user" | "other",
        timestamp: msg.timestamp,
        type: msg.type === "image" || msg.type === "file" || msg.type === "video" ? "text" : msg.type as "text" | "sticker",
        isRead: msg.isRead
    }))

    const handleSendMessage = () => {
        if (message.trim()) onSendMessage()
    }

    const handleSendFriendRequest = () => {
        setFriendRequestStatus("pending")
        setTimeout(() => setFriendRequestStatus("waiting"), 1000)
    }

    const handleAcceptFriendRequest = () => setFriendRequestStatus("accepted")

    const handleToggleInfo = () => setShowInfoPanel(!showInfoPanel)
    const handleToggleChatBubble = () => setShowChatBubble(!showChatBubble)

    return (
        <div className="h-full w-full flex flex-col bg-[#f7f9fb] rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300">
            {/* Header */}
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

            {/* Nội dung chính */}
            <div className="flex-1 flex overflow-hidden">
                {/* Khu vực chat */}
                <div className={`flex-1 flex flex-col bg-white transition-all duration-300 ${showInfoPanel ? "lg:rounded-l-2xl" : "rounded-2xl"}`}>
                    {/* Vùng tin nhắn */}
                    <div className="flex-1 overflow-hidden">
                        <MessageAreaWindownChat messages={strangerMessages} user={userForComponents} />
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-100 bg-white">
                        <InputWindownChat
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                            recipientName={recipientName}
                            disabled={false}
                        />
                    </div>
                </div>

                <div
                    className={`hidden lg:flex flex-col border-l border-gray-100 bg-white transition-all duration-300 ${showInfoPanel ? "w-80 opacity-100" : "w-0 opacity-0"
                        } overflow-hidden`}
                >
                    {showInfoPanel && (
                        <InfoUserWindownChat user={userForComponents} onClose={() => setShowInfoPanel(false)} />
                    )}
                </div>
            </div>

            {/* Bong bóng chat mini */}
            {showChatBubble && <BubbleStartChat handleToggleChatBubble={handleToggleChatBubble} />}

            {/* Nút mở bong bóng chat */}
            <div className="fixed bottom-6 right-6 z-40">
                <Button
                    onClick={handleToggleChatBubble}
                    className="w-14 h-14 rounded-full shadow-2xl bg-[#0084ff] hover:bg-[#0072e5] text-white flex items-center justify-center transition-transform hover:scale-105"
                >
                    <MessageCircle className="w-6 h-6" />
                </Button>
            </div>
        </div>
    )
}
