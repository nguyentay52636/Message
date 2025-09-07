import React from 'react'
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IFriendRequest, IUser } from '@/types/types';

import ButtonAccessFriends from './ButtonAccessFriends';

interface FriendsRequestListProps {
    friendRequests: IFriendRequest[]
    loading: boolean
    onRequestUpdate?: () => void
}
export default function FriendsRequestList({ friendRequests, loading, onRequestUpdate }: FriendsRequestListProps) {



    if (loading) {
        return (
            <div className="space-y-2">
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
            </div>
        )
    }

    if (!friendRequests || !Array.isArray(friendRequests) || friendRequests.length === 0) {
        return (
            <div className="text-sm text-muted-foreground">Không có lời mời kết bạn nào.</div>
        )
    }

    return (
        <div className="space-y-4">
            {friendRequests.map((request: IFriendRequest, index: number) => {
                const sender = typeof request.sender === 'string' ? null : request.sender as IUser;
                const senderName = sender?.username || (typeof request.sender === 'string' ? request.sender : 'Unknown');
                const senderAvatar = sender?.avatar;
                const senderInitial = sender?.username?.charAt(0) || "?";

                return (
                    <Card key={request._id || index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={senderAvatar} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80 text-white font-semibold">
                                            {senderInitial}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{senderName}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {request.createdAt ? new Date(request.createdAt).toLocaleString() : ""}
                                        </p>
                                    </div>
                                </div>
                                <ButtonAccessFriends requestId={request._id || ""} />
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}
