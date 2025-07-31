import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ChatContextType {
    selectedUserId: string | undefined
    setSelectedUserId: (userId: string | undefined) => void
    activeTab: string
    setActiveTab: (tab: string) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>()
    const [activeTab, setActiveTab] = useState("all")

    return (
        <ChatContext.Provider value={{
            selectedUserId,
            setSelectedUserId,
            activeTab,
            setActiveTab
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (context === undefined) {
        throw new Error('useChat must be used within a ChatProvider')
    }
    return context
} 