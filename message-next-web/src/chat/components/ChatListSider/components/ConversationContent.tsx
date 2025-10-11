import { useConversations } from "../hooks/useConversations"
import { ConversationList } from "./ConversationList"
import { ConversationEmptyState } from "./ConversationEmptyState"
import { ConversationErrorState } from "./ConversationErrorState"
import { ConversationLoadingState } from "./ConversationLoadingState"
import { useEffect } from "react"

interface ConversationContentProps {
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
    onConversationCreated?: (conversationId: string) => void
}

export const ConversationContent = ({
    activeTab,
    onChatSelect,
    selectedChat,
    onConversationCreated
}: ConversationContentProps) => {
    const { conversations, loading, error, refreshConversations } = useConversations()

    const filteredConversations = activeTab === "unread"
        ? conversations.filter((conv) => conv.unreadCount && conv.unreadCount > 0)
        : conversations

    // Listen for new conversation creation
    useEffect(() => {
        if (onConversationCreated) {
            console.log("🔄 Conversation created, refreshing list...")
            refreshConversations()
        }
    }, [onConversationCreated, refreshConversations])

    const renderContent = () => {
        if (error) {
            return <ConversationErrorState error={error} />
        }

        if (loading) {
            return <ConversationLoadingState />
        }

        if (filteredConversations.length === 0) {
            return (
                <ConversationEmptyState
                    hasConversations={conversations.length > 0}
                    activeTab={activeTab}
                />
            )
        }

        return (
            <ConversationList
                conversations={filteredConversations}
                activeTab={activeTab}
                onChatSelect={onChatSelect}
                selectedChat={selectedChat}
            />
        )
    }

    return (
        <div className="flex-1 overflow-y-auto">
            {renderContent()}
        </div>
    )
}
