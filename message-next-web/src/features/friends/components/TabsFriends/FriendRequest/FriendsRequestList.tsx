"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { IFriendRequest, IUser } from "@/types/types"
import ButtonAccessFriends from "./ButtonAccessFriends"

interface FriendsRequestListProps {
    friendRequests: IFriendRequest[]
    loading: boolean
    onRequestUpdate?: () => void
}

export default function FriendsRequestList({
    friendRequests,
    loading,
    onRequestUpdate,
}: FriendsRequestListProps) {
    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded-lg bg-gray-100 animate-pulse" />
                ))}
            </div>
        )
    }

    if (!friendRequests || friendRequests.length === 0) {
        return (
            <div className="text-sm text-gray-500 text-center py-6">
                Không có lời mời kết bạn nào 💌
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {friendRequests.map((request: IFriendRequest, index: number) => {
                const sender =
                    typeof request.sender === "string" ? null : (request.sender as IUser)
                const senderName =
                    sender?.username ||
                    (typeof request.sender === "string" ? request.sender : "Người dùng ẩn")
                const senderAvatar = sender?.avatar
                const senderInitial = sender?.username?.charAt(0)?.toUpperCase() || "?"

                return (
                    <Card
                        key={request._id || index}
                        className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 rounded-xl"
                    >
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                {/* Thông tin người gửi */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-blue-100">
                                        <AvatarImage src={senderAvatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                                            {senderInitial}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <p className="font-semibold text-gray-800">{senderName}</p>
                                        <p className="text-xs text-gray-500">
                                            {request.createdAt
                                                ? new Date(request.createdAt).toLocaleString("vi-VN", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })
                                                : ""}
                                        </p>
                                    </div>
                                </div>

                                {/* Nút chấp nhận / từ chối */}
                                <div className="flex items-center">
                                    <ButtonAccessFriends requestId={request._id || ""} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
