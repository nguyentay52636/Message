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


            if (isAuthenticated && user?.id) {
                const requests: IFriendRequest[] = await getAllFriendRequestUser(user.id)
                setFriendRequests(requests)
                console.log('Lời mời kết bạn:', requests)
            } else {
                console.warn('User not authenticated or missing user ID', { isAuthenticated, user })
                setFriendRequests([])
            }
        } catch (error: any) {

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