import { ChatListPanel } from '../home/components/ChatListPanel/ChatListPanel'
import { cn } from '@/lib/utils'
import { useSliderTabBar } from '@/components/layouts/hooks/SliderTabBar'
export default function ChatPages() {
    const {
        selectedChat,
        isMobileSidebarOpen,
        sidebarWidth,
        handleChatSelect,
        handleToggleMobileSidebar,
        handleMouseDown,
    } = useSliderTabBar()
    return (
        <div
            className={cn(
                "flex-shrink-0 w-[400px!] border-r border-border bg-card z-20 relative",

                "lg:relative absolute inset-y-0 left-0",
                "lg:translate-x-0 transition-transform duration-300 ease-in-out",
                isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
            )}
            style={{ width: sidebarWidth }}
        >
            <ChatListPanel
                onChatSelect={handleChatSelect}
                selectedChat={selectedChat || ''}
                onToggleMobileSidebar={handleToggleMobileSidebar}
            />

            <div
                className="hidden lg:block absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-primary/20 transition-colors z-10 group"
                onMouseDown={handleMouseDown}
            >
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-1 h-12 bg-border group-hover:bg-primary/40 rounded-l transition-colors" />
            </div>
        </div>
    )
}
