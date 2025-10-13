import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import ListFriendsAction from './ListFriendsAction'
import { IFriendDisplay } from '@/types/types'

interface FriendItemProps {
    friend: IFriendDisplay
}
export default function FriendItem({ friend }: FriendItemProps) {
    const formatLastSeen = (lastSeen?: string) => {
        if (!lastSeen) return "lâu rồi";

        const now = new Date();
        const lastSeenDate = new Date(lastSeen);
        const diffInMinutes = Math.floor((now.getTime() - lastSeenDate.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "vừa xong";
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} giờ trước`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} ngày trước`;

        return lastSeenDate.toLocaleDateString('vi-VN');
    };

    return (
        <Card className="hover:bg-gray-100 transition-shadow">
            <CardContent className="p-2">
                <div className="flex items-center justify-between cursor-pointer rounded-xl">
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="relative px-4">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-semibold">
                                    {friend.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            {friend.isOnline && (
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                        </div>
                        <div>
                            <p className="font-semibold">{friend.name}</p>
                            {friend.isOnline ? (
                                <p className="text-sm text-green-600">Đang hoạt động</p>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    Hoạt động {formatLastSeen(friend.lastSeen)}
                                </p>
                            )}
                        </div>
                    </div>
                    <ListFriendsAction />
                </div>
            </CardContent>
        </Card>
    )
}
