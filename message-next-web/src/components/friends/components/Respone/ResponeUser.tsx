import React from "react";
import { IUser } from "@/types/types";

interface ResponeUserProps {
    user: IUser | null;
    loading?: boolean;
    searchQuery?: string;
}

export default function ResponeUser({ user, loading, searchQuery }: ResponeUserProps) {
    if (loading) {
        return <p className="text-sm text-gray-500 mt-4">Đang tìm kiếm...</p>;
    }

    if (!loading && searchQuery && !user) {
        return <p className="text-sm text-gray-500 mt-4">Không tìm thấy người dùng</p>;
    }

    if (!user) return null;

    return (
        <div className="flex cursor-pointer hover:bg-gray-100 items-center gap-3 p-3 border rounded-xl bg-white shadow-sm mt-4">
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
                className={`w-3 h-3 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
            ></span>
        </div>
    );
}
