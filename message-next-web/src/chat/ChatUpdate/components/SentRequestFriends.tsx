import { Button } from '@/components/ui/button'
import React from 'react'
import { Plus, UserCheck } from 'lucide-react'
import { MoreHorizontal } from 'lucide-react'
import { selectAuth } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function SentRequestFriends() {
    const { isAuthenticated, user } = useSelector(selectAuth)
    const onSentFriendRequest = () => {
        console.log("Sent friend request")
    }
    return (
        <>
            <div className="px-4 py-2.5 bg-blue-50 border-b border-blue-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">Gửi yêu cầu kết bạn tới người này</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="default"
                            onClick={onSentFriendRequest}
                            className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 h-7 text-sm rounded-md font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Gửi kết bạn
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="ghost" size="sm" className="p-1 h-7 w-7 text-gray-500 hover:text-gray-700">
                                    <MoreHorizontal className="w-4 h-4" />
                                </Button></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Chặn người này </DropdownMenuItem>
                                <DropdownMenuItem>Báo cáo </DropdownMenuItem>
                                <DropdownMenuItem>Chia sẻ  </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    )
}
