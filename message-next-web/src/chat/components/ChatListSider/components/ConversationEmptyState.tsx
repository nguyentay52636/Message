interface ConversationEmptyStateProps {
    hasConversations: boolean
    activeTab: "all" | "unread"
}

export const ConversationEmptyState = ({ hasConversations, activeTab }: ConversationEmptyStateProps) => {
    const getMessage = () => {
        if (!hasConversations) {
            return 'No conversations found'
        }
        return activeTab === "unread" ? 'No unread conversations' : 'No conversations'
    }

    return (
        <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">
                {getMessage()}
            </div>
        </div>
    )
}
