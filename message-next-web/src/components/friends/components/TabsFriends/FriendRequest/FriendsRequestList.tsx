import React from 'react'
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
// import { mockFriendRequests } from '../../mock/data';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IFriendRequest, IUser } from '@/types/types';
import { acceptFriendRequest, refuseFriendRequest } from '@/apis/friendsApi';
import { toast } from 'sonner';

interface FriendsRequestListProps {
    friendRequests: IFriendRequest[]
    loading: boolean
    onRequestUpdate?: () => void
}
export default function FriendsRequestList({ friendRequests, loading, onRequestUpdate }: FriendsRequestListProps) {
    const handleAcceptRequest = async (requestId: string) => {
        try {
            await acceptFriendRequest(requestId);
            toast.success("Đã chấp nhận lời mời kết bạn");
            onRequestUpdate?.();
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi chấp nhận lời mời");
        }
    };

    const handleRejectRequest = async (requestId: string) => {
        try {
            await refuseFriendRequest(requestId);
            toast.success("Đã từ chối lời mời kết bạn");
            onRequestUpdate?.();
        } catch (error: any) {
            toast.error(error.message || "Có lỗi xảy ra khi từ chối lời mời");
        }
    };
    if (loading) {
        return (
            <div className="space-y-2">
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
                <div className="h-14 rounded-md bg-muted/40 animate-pulse" />
            </div>
        )
    }

    if (!friendRequests || friendRequests.length === 0) {
        return (
            <div className="text-sm text-muted-foreground">Không có lời mời kết bạn nào.</div>
        )
    }

    return (
        <div className="space-y-4">
            {friendRequests.map((request:IFriendRequest, index:number) => {
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
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => request._id && handleAcceptRequest(request._id)}
                                        className="px-4 py-2 rounded-xl cursor-pointer"
                                        disabled={!request._id}
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Chấp nhận
                                    </Button>
                                    <Button
                                        onClick={() => request._id && handleRejectRequest(request._id)}
                                        variant="outline"
                                        className="px-4 py-2 rounded-xl bg-transparent cursor-pointer"
                                        disabled={!request._id}
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Từ chối
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    )
}
