import React from 'react'
import { IFriendRequest } from '@/types/types';
import FriendRequestItem from './FriendRequestItem';

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
            {friendRequests.map((request: IFriendRequest, index: number) => (
                <FriendRequestItem key={request._id || index} request={request} />
            ))}
        </div>
    )
}
