"use client"

import { useState } from "react"
import MessageAreaWindownChat from "./MessageAreaWindownChat"
import InputWindownChat from "./InputWindownChat"
import InfoUserWindownChat from "./InfoUserWindownChat"
import HeaderWindownChat from "./HeaderWindownChat"


interface StrangerMessage {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
    type: "text" | "emoji" | "missed-call" | "sticker" | "link-preview"
    isRead?: boolean
    linkData?: {
        url: string
        title: string
        description: string
        domain: string
        thumbnail: string
        likes?: number
    }
}

interface StrangerChatPageProps {
    onBack?: () => void
}

export function MainWindownChat({ onBack }: StrangerChatPageProps) {
    const [showInfoPanel, setShowInfoPanel] = useState(true)
    const [message, setMessage] = useState("")
    const [friendRequestStatus, setFriendRequestStatus] = useState<"pending" | "waiting" | "accepted">("waiting") // Changed to waiting to show banner

    // Mock user data
    const strangerUser = {
        id: "stranger-1",
        name: "Trần Quốc Tho",
        avatar: "/placeholder.svg?height=48&width=48&text=TQT",
        isOnline: false,
    }

    // Mock messages matching the image
    const [messages, setMessages] = useState<StrangerMessage[]>([
        {
            id: "1",
            content: "Hi",
            sender: "other",
            timestamp: "20:34",
            type: "text",
            isRead: true,
        },
        {
            id: "2",
            content: "🐰", // Bunny sticker
            sender: "other",
            timestamp: "20:34",
            type: "sticker",
            isRead: true,
        },
        {
            id: "3",
            content: "Okie em",
            sender: "user",
            timestamp: "20:35",
            type: "text",
            isRead: true,
        },
        {
            id: "4",
            content: "https://github.com/nguyentay52636/",
            sender: "user",
            timestamp: "20:36",
            type: "link-preview",
            isRead: true,
            linkData: {
                url: "https://github.com/nguyentay52636/",
                title: "nguyentay52636 - Overview",
                description: "nguyentay52636 has 30 repositories available. Follow their code on GitHub.",
                domain: "github.com",
                thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-s3nrW57zE6OLlhG3ItCv9c1hveWXWe.png",
                likes: 1,
            },
        },
    ])

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage: StrangerMessage = {
                id: Date.now().toString(),
                content: message,
                sender: "user",
                timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                type: "text",
                isRead: false,
            }

            setMessages((prev) => [...prev, newMessage])
            setMessage("")

            // Simulate auto reply after 2 seconds
            setTimeout(() => {
                const autoReply: StrangerMessage = {
                    id: (Date.now() + 1).toString(),
                    content: "Cảm ơn bạn đã nhắn tin! 😊",
                    sender: "other",
                    timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
                    type: "text",
                    isRead: true,
                }
                setMessages((prev) => [...prev, autoReply])
            }, 2000)
        }
    }

    const handleSendFriendRequest = () => {
        setFriendRequestStatus("pending")
        // Simulate friend request being sent
        setTimeout(() => {
            setFriendRequestStatus("waiting")
        }, 1000)
        console.log("Friend request sent to:", strangerUser.name)
    }

    const handleAcceptFriendRequest = () => {
        setFriendRequestStatus("accepted")
        console.log("Friend request accepted for:", strangerUser.name)
    }

    const handleToggleInfo = () => {
        setShowInfoPanel(!showInfoPanel)
    }

    return (
        <div className="h-screen flex flex-col bg-white">
            {/* Chat Header */}
            <div className="flex-shrink-0">
                <HeaderWindownChat
                    user={strangerUser}
                    onBack={onBack}
                    onToggleInfo={handleToggleInfo}
                    onSendFriendRequest={handleSendFriendRequest}
                    onAcceptFriendRequest={handleAcceptFriendRequest}
                    showInfoPanel={showInfoPanel}
                />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Chat Area */}
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-hidden">
                        <MessageAreaWindownChat messages={messages} user={strangerUser} />
                    </div>

                    {/* Message Input */}
                    <div className="flex-shrink-0">
                        <InputWindownChat
                            message={message}
                            setMessage={setMessage}
                            onSendMessage={handleSendMessage}
                            recipientName={strangerUser.name}
                            disabled={false} // Always enabled for testing
                        />
                    </div>
                </div>

                {/* Info Panel - Desktop Only */}
                {showInfoPanel && (
                    <div className="hidden lg:block flex-shrink-0">
                        <InfoUserWindownChat user={strangerUser} onClose={() => setShowInfoPanel(false)} />
                    </div>
                )}
            </div>
        </div>
    )
}
