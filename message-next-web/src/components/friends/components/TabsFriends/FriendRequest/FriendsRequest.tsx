import { UserPlus } from "lucide-react";
import FriendsRequestList from "./FriendsRequestList";
import { IFriendRequest } from "@/types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "@/redux/slices/authSlice";
import { getAllFriendRequestUser } from "@/apis/friendsApi";
import { toast } from "sonner";

export default function FriendsRequest() {
    const [friendRequests, setFriendRequests] = useState<IFriendRequest[]>([]);
    const { isAuthenticated, user } = useSelector(selectAuth)
    const [loading, setLoading] = useState(false)

    const handleGetFriendRequests = async () => {
        try {
            setLoading(true)
            console.log('=== DEBUG FriendsRequest ===')
            console.log('Auth state:', { isAuthenticated, user, userId: user?.id })
            console.log('isAuthenticated type:', typeof isAuthenticated)
            console.log('user type:', typeof user)
            console.log('user.id type:', typeof user?.id)

            if (isAuthenticated && user?.id) {
                console.log('Đang gọi API getAllFriendRequestUser với userId:', user.id)
                const requests: IFriendRequest[] = await getAllFriendRequestUser(user.id)
                console.log("API response:", requests)
                console.log("Response type:", typeof requests)
                console.log("Response length:", Array.isArray(requests) ? requests.length : 'Not an array')
                setFriendRequests(requests)
            } else {
                console.warn('User not authenticated or missing user ID', { isAuthenticated, user })
                setFriendRequests([])
            }
        } catch (error: any) {
            console.error('Error fetching friend requests:', error)
            console.error('Error details:', {
                message: error.message,
                response: error.response,
                status: error.response?.status,
                data: error.response?.data
            })
            toast.error(error.message || 'Có lỗi xảy ra khi tải danh sách lời mời kết bạn')
            setFriendRequests([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetFriendRequests()
    }, [isAuthenticated, user?.id])
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <UserPlus className="w-6 h-6 text-primary" />
                <h1 className="text-2xl font-bold">Lời mời kết bạn</h1>
            </div>

            {/* Stats */}
            <div className="bg-muted/30 rounded-xl p-4">
                <p className="text-lg font-semibold">Lời mời ({friendRequests.length})</p>
            </div>
            <FriendsRequestList
                friendRequests={friendRequests}
                loading={loading}
                onRequestUpdate={handleGetFriendRequests}
            />
        </div>
    )
}