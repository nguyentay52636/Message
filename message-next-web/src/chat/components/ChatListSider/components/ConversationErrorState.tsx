interface ConversationErrorStateProps {
    error: string
}

export const ConversationErrorState = ({ error }: ConversationErrorStateProps) => {
    return (
        <div className="flex items-center justify-center h-32">
            <div className="text-red-500 text-center">
                <div>Error loading conversations</div>
                <div className="text-xs mt-1">{error}</div>
            </div>
        </div>
    )
}
