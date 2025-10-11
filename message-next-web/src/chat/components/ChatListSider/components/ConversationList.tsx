import ChatListItem from "../../ChatListItem"
import { IConversationDisplay } from "@/types/types"

interface ConversationListProps {
    conversations: IConversationDisplay[]
    activeTab: "all" | "unread"
    onChatSelect: (chatId: string) => void
    selectedChat: string | null
}

export const ConversationList = ({
    conversations,
    activeTab,
    onChatSelect,
    selectedChat
}: ConversationListProps) => {
    return (
        <>
            {conversations.map((conversation: IConversationDisplay, index: number) => (
                <ChatListItem
                    key={conversation.id}
                    user={conversation}
                    activeTab={activeTab}
                    onChatSelect={onChatSelect}
                    selectedChat={selectedChat}
                    index={index}
                />
            ))}
        </>
    )
}
