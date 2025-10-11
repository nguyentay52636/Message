import { useConversations } from "../hooks/useConversations"
import { ConversationList } from "./ConversationList"
import { ConversationEmptyState } from "./ConversationEmptyState"
import { ConversationErrorState } from "./ConversationErrorState"
import { ConversationLoadingState } from "./ConversationLoadingState"
import { DebugInfo } from "./DebugInfo"

interface ConversationContentProps {
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
}

export const ConversationContent = ({
    activeTab,
    onChatSelect,
    selectedChat
}: ConversationContentProps) => {
    const { conversations, loading, error } = useConversations()

    const filteredConversations = activeTab === "unread"
        ? conversations.filter((conv) => conv.unreadCount && conv.unreadCount > 0)
        : conversations

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
            <DebugInfo />
            {renderContent()}
        </div>
    )
}
