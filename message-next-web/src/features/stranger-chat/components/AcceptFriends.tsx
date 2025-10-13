import { Button } from '@/components/ui/button'
import React from 'react'
import { UserCheck } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { selectAuth } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'
interface AcceptFriendsProps {
    onAcceptFriendRequest: () => void
}
export default function AcceptFriends({ onAcceptFriendRequest }: AcceptFriendsProps) {
    const { isAuthenticated, user } = useSelector(selectAuth)

    return (
        <>
            <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Đang chờ được đồng ý kết bạn</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            onClick={onAcceptFriendRequest}
                            className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 h-7 text-sm rounded-md font-medium"
                        >
                            Đồng ý
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-gray-500 hover:text-gray-700">
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
