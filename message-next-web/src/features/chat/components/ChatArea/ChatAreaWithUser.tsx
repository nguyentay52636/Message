"use client"

import { ChatInput } from "./components/ChatInput"
import ChatContent from "./components/ChatContent"
import { Message } from "@/lib/Mock/dataMock"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IUser } from "@/types/types"
import { HeaderAreaWithUser } from "./components/HeaderAreaWithUser"

interface MessageAreaProps {
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

export function ChatAreaWithUser({
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
}: MessageAreaProps) {
    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Fixed Header at Top */}
            {user && (
                <div className="flex-shrink-0 bg-background border-b border-border">
                    <HeaderAreaWithUser
                        user={user}
                        onToggleMobileSidebar={onToggleMobileSidebar}
                        onBack={onBack}
                    />
                </div>
            )}

            {/* Scrollable Chat Content Area */}
            <div className="flex-1 min-h-0 overflow-hidden pb-20 sm:pb-24">
                <ScrollArea className="h-full w-full">
                    <ChatContent messages={messages} selectedChat={selectedChat} />
                </ScrollArea>
            </div>

            {/* Fixed Input Area at Bottom */}
            <div className="flex-shrink-0 bg-background border-t border-border absolute bottom-0 left-0 right-0 p-2 sm:p-4">
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