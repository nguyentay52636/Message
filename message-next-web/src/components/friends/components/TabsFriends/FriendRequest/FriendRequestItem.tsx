import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ButtonAccessFriends from './ButtonAccessFriends'
import { IFriendRequest, IUser } from '@/types/types'

interface FriendRequestItemProps {
    request: IFriendRequest
}
export default function FriendRequestItem({ request }: FriendRequestItemProps) {
    const { sender } = request;

    const senderUser = typeof sender === 'string' ? null : sender as IUser;
    const senderName = senderUser?.username || (typeof sender === 'string' ? sender : 'Unknown');
    const senderAvatar = senderUser?.avatar;
    const senderInitial = senderUser?.username?.charAt(0) || "?";

    return (
        <>
            <Card key={request._id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                                <AvatarImage src={senderAvatar} />
                                <AvatarFallback className="bg-gradient-to-br bg-blue-500 to-secondary/80 text-white font-semibold">
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
        </>
    )
}
