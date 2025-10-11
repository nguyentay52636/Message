"use client"

import { Users, UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect, useCallback } from "react"
import { IUser, IFriendDisplay } from "@/types/types"
import { FindUserByPhone } from "@/apis/friendsRequestApi"
import ResponeUser from "@/components/friends/components/Respone/ResponeUser"

interface ChatFilterSearchProps {
    friends: IFriendDisplay[]
    loadingFriends: boolean
    onSelectUser?: (u: IUser) => void
    onConversationCreated?: (conversationId: string) => void
}

export default function ChatFilterSearch({
    friends,
    loadingFriends,
    onSelectUser,
    onConversationCreated,
}: ChatFilterSearchProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(false)

    const handleSelectUser = useCallback(
        (u: IUser) => {
            console.log("ChatFilterSearch - onSelectUser:", u)
            setUser(u)
            onSelectUser?.(u)
        },
        [onSelectUser]
    )

    useEffect(() => {
        if (!searchQuery) {
            setUser(null)
            return
        }

        const delay = setTimeout(async () => {
            try {
                setLoading(true)
                const res = await FindUserByPhone(searchQuery)
                if (res && res.length > 0) setUser(res[0])
                else setUser(null)
            } catch (error) {
                console.error(error)
                setUser(null)
            } finally {
                setLoading(false)
            }
        }, 400)

        return () => clearTimeout(delay)
    }, [searchQuery])

    return (
        <div className="w-full px-3 sm:px-0">
            <div className="flex items-center gap-2 mb-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Tìm kiếm bạn bè hoặc tin nhắn..."
                        className="pl-9 pr-10 h-10 bg-[#f4f5f7] border-none rounded-full text-sm placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-blue-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-[#e9eef5] hover:bg-[#d8e3f2] transition"
                    >
                        <Users className="w-5 h-5 text-[#107bbd]" />
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-full bg-[#e9eef5] hover:bg-[#d8e3f2] transition"
                    >
                        <UserPlus className="w-5 h-5 text-[#107bbd]" />
                    </Button>
                </div>
            </div>

            {/* --- Danh sách bạn bè --- */}
            {!searchQuery && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-[#107bbd]">
                            Bạn bè ({friends.length})
                        </h3>
                        {loadingFriends && (
                            <div className="text-xs text-gray-400">Đang tải...</div>
                        )}
                    </div>

                    {/* <div className="max-h-[250px] overflow-y-auto">
                        {friends.length > 0 ? (
                            <div className="space-y-1">
                                {friends.map((friend) => (
                                    <div
                                        key={friend.id}
                                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#f0f4f8] cursor-pointer transition"
                                        onClick={() => {
                                            const userData: IUser = {
                                                _id: friend.id,
                                                id: friend.id,
                                                username: friend.username,
                                                email: friend.email,
                                                phone: friend.phone,
                                                password: "",
                                                avatar: friend.avatar,
                                                status: friend.status,
                                                lastSeen: friend.lastSeen
                                                    ? new Date(friend.lastSeen)
                                                    : undefined,
                                            }
                                            handleSelectUser(userData)
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={
                                                    friend.avatar ||
                                                    `https://ui-avatars.com/api/?name=${friend.username}&background=107bbd&color=fff`
                                                }
                                                alt={friend.username}
                                                className="w-10 h-10 rounded-full object-cover border border-[#e6ebf2]"
                                            />
                                            <span
                                                className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white ${friend.isOnline ? "bg-green-500" : "bg-gray-400"
                                                    }`}
                                            ></span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-800 truncate">
                                                {friend.username}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {friend.isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !loadingFriends && (
                                <p className="text-xs text-gray-400 text-center py-3">
                                    Chưa có bạn bè nào 😢
                                </p>
                            )
                        )}
                    </div> */}
                </div>
            )}

            {/* --- Kết quả tìm kiếm --- */}
            <ResponeUser
                users={user}
                loading={loading}
                searchQuery={searchQuery}
                onSelectUser={handleSelectUser}
                onConversationCreated={onConversationCreated}
            />
        </div>
    )
}
