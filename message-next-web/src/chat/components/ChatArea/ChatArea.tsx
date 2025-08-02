
"use client"

import { ChatInput } from "./components/ChatInput"
import { HeaderArea } from "./components/HeaderArea"
import ChatContent from "./components/ChatContent"
import { Message, ChatUser } from "@/lib/Mock/dataMock"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MessageAreaProps {
    messages: Message[]
    setSelectedChat: (chatId: string) => void
    selectedChat: string | null
    message: string
    setMessage: (message: string) => void
    onSendMessage: () => void
    recipientName: string
    user?: ChatUser
    onToggleMobileSidebar?: () => void
}

export function ChatArea({ messages, setSelectedChat, selectedChat, message, setMessage, onSendMessage, recipientName, user, onToggleMobileSidebar }: MessageAreaProps) {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Fixed Header at Top */}
            {user && (
                <div className="flex-shrink-0 bg-background">
                    <HeaderArea
                        user={user}
                        onToggleMobileSidebar={onToggleMobileSidebar}
                    />
                </div>
            )}

            {/* Scrollable Chat Content Area */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea className="h-full w-full">
                    <ChatContent messages={messages} selectedChat={selectedChat} />
                </ScrollArea>
            </div>

            {/* Fixed Input Area at Bottom */}
            <div className="flex-shrink-0 bg-background">
                <ChatInput
                    message={message}
                    setMessage={setMessage}
                    onSendMessage={onSendMessage}
                    recipientName={recipientName}
                />
            </div>
        </div>
    )
}
