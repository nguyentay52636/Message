type ConversationLoadingStateProps = Record<string, never>

export const ConversationLoadingState = ({ }: ConversationLoadingStateProps) => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Loading conversations...</div>
        </div>
    )
}
