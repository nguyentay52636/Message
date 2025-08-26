import React from "react";
import { IUser } from "@/types/types";

interface ResponeUserProps {
    user: IUser | null;
    loading?: boolean;
    searchQuery?: string;
    onSelectUser?: (user: IUser) => void;
    // Legacy support for old prop name
    onSelect?: (user: IUser) => void;
}

export default function ResponeUser(props: ResponeUserProps) {
    const { user, loading, searchQuery } = props;
    const selectHandler = props.onSelectUser ?? props.onSelect;

    // Debug all props
    console.log("ResponeUser props:", props);
    console.log("select handler used:", selectHandler ? (props.onSelectUser ? "onSelectUser" : "onSelect") : "none");

    if (loading) {
        return <p className="text-sm text-gray-500 mt-4">Đang tìm kiếm...</p>;
    }

    if (!loading && searchQuery && !user) {
        return <p className="text-sm text-gray-500 mt-4">Không tìm thấy người dùng</p>;
    }

    if (!user) return null;

    const handleClick = () => {
        console.log("ResponeUser clicked:", user);
        console.log("selectHandler function:", selectHandler);
        if (user && selectHandler) {
            selectHandler(user);
        }
    };

    return (
        <div
            onClick={handleClick}
            role="button"
            tabIndex={0}
            className="flex cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 items-center gap-3 p-3 border rounded-xl bg-white dark:bg-gray-900 shadow-sm mt-4 transition-colors select-none">
            <img
                src={user.avatar || "/default-avatar.png"}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-gray-500">{user.phone}</div>
            </div>
            <span
                className={`w-3 h-3 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}
            ></span>
        </div>
    );
}