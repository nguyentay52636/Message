import React, { useState } from "react";
import { IUser } from "@/types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { addConversation } from "@/apis/conservationApi";

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
    const [creating, setCreating] = useState(false);
    const { user } = useSelector(selectAuth);

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
        if (!user?._id || !users?._id) return;
        try {
            setCreating(true);

            const newConversation = await addConversation({
                members: [user._id, users._id],
                type: "personal",
            });
            console.log("✅ Conversation created:", newConversation);

            // Notify parent component about new conversation
            if (onConversationCreated) {
                onConversationCreated(newConversation._id);
            }

            router.push(`/chat/${newConversation._id}`);
        } catch (error: any) {
            console.error("❌ Lỗi khi tạo cuộc trò chuyện:", error.message);
            alert("Không thể tạo cuộc trò chuyện!");
        } finally {
            setCreating(false);
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
                disabled={creating}
                className="cursor-pointer
          px-3 py-1 text-[13px] font-medium text-[#007aff] 
          border border-[#007aff] rounded-lg 
          hover:bg-[#007aff] hover:text-white 
          transition-colors duration-200
        "
            >
                {creating ? "Đang tạo..." : "Chat"}
            </Button>
        </div>
    );
}
