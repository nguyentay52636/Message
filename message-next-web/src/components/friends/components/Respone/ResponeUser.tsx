import React, { useState } from "react";
import { IUser } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { useChatConnection } from "@/features/chat/hooks/useChatConnection";

interface ResponeUserProps {
    users: IUser | null;
    loading?: boolean;
    searchQuery?: string;
    onSelectUser?: (users: IUser) => void;
    onSelect?: (users: IUser) => void;
    onConversationCreated?: (conversationId: string) => void;
}

export default function ResponeUser(props: ResponeUserProps) {
    const { users, loading, searchQuery, onConversationCreated } = props;
    const selectHandler = props.onSelectUser ?? props.onSelect;
    const router = useRouter();
    const { user } = useSelector(selectAuth);
    const { openChatConnection, isConnecting, checkSocketConnection } = useChatConnection();

    console.log(users?._id)
    console.log(user?._id)

    if (loading) {
        return <p className="text-sm text-gray-500 mt-4">Đang tìm kiếm...</p>;
    }

    if (!loading && searchQuery && !users) {
        return <p className="text-sm text-gray-500 mt-4">Không tìm thấy người dùng</p>;
    }

    if (!users) return null;

    const handleClick = () => {
        if (users && selectHandler) selectHandler(users);
    };

    const handleChat = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!user?._id || !users?._id) {
            console.error("❌ Missing user IDs:", { currentUser: user?._id, targetUser: users?._id });
            return;
        }

        // Check socket connection status
        const connectionStatus = checkSocketConnection();
        console.log("🔍 Socket connection status:", connectionStatus);

        if (!connectionStatus.isConnected) {
            alert("Đang kết nối socket, vui lòng thử lại sau!");
            return;
        }

        try {
            console.log("🚀 Starting chat connection process...");

            const result = await openChatConnection(users._id, users.username);

            if (result.success) {
                console.log("✅ Chat connection established successfully!");

                if (onConversationCreated) {
                    console.log("📞 Calling onConversationCreated with ID:", result.conversationId);
                    onConversationCreated(result.conversationId);
                }

                // Navigate to chat page (stable route)
                router.push(`/strager-chat`);
            } else {
                console.error("❌ Failed to establish chat connection:", result.error);
                alert(`Không thể tạo cuộc trò chuyện: ${result.error}`);
            }
        } catch (error: any) {
            console.error("❌ Unexpected error:", error);
            alert("Có lỗi xảy ra khi tạo cuộc trò chuyện!");
        }
    };

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            className="
        flex items-center gap-3 px-3 py-2 mt-3 rounded-xl cursor-pointer 
        bg-white dark:bg-[#1f1f1f] 
        hover:bg-[#f3f4f6] dark:hover:bg-[#2a2a2a] 
        transition-all duration-200
        shadow-sm
        border border-transparent hover:border-[#e5e7eb]
      "
        >
            <div className="relative">
                <img
                    src={users.avatar || "/default-avatar.png"}
                    alt={users.username}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                />
                <span
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white 
            ${users.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
                ></span>
            </div>

            <div className="flex-1 min-w-0">
                <div className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {users.username}
                </div>
                <div className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                    {users.phone}
                </div>
            </div>

            <Button
                variant="ghost"
                onClick={handleChat}
                disabled={isConnecting}
                className="cursor-pointer
          px-3 py-1 text-[13px] font-medium text-[#007aff] 
          border border-[#007aff] rounded-lg 
          hover:bg-[#007aff] hover:text-white 
          transition-colors duration-200
        "
            >
                {isConnecting ? "Đang kết nối..." : "Chat"}
            </Button>
        </div>
    );
}
