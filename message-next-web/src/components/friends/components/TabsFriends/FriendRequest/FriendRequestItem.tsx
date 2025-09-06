import { getAllFriendRequestUser } from '@/apis/friendsApi'
import { selectAuth } from '@/redux/slices/authSlice'
import { IFriendRequest, IUser } from '@/types/types'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function FriendRequestItem() {
    const [requestFriends, setRequestFriends] = useState<IFriendRequest[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useSelector(selectAuth)

    console.log("user", user)
    console.log("user._id", user?._id)

    useEffect(() => {
        const fetchRequestFriends = async () => {
            if (user?._id) {
                try {
                    setLoading(true)
                    setError(null)
                    console.log("Đang gọi API getAllFriendRequestUser với userId:", user._id)
                    const response = await getAllFriendRequestUser(user._id)
                    console.log("API response:", response)
                    setRequestFriends(response)
                    console.log("danh sach lời mời kết bạn", response)
                } catch (err) {
                    console.error("Lỗi khi gọi API:", err)
                    setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
                } finally {
                    setLoading(false)
                }
            } else {
                console.log("Không có user._id, không gọi API")
            }
        }
        fetchRequestFriends()
    }, [user?._id])
    if (loading) {
        return <div>Đang tải danh sách lời mời kết bạn...</div>
    }

    if (error) {
        return <div>Lỗi: {error}</div>
    }

    if (!user?._id) {
        return <div>Vui lòng đăng nhập để xem lời mời kết bạn</div>
    }

    return (
        <div>
            <h3>Danh sách lời mời kết bạn ({requestFriends.length})</h3>
            {requestFriends.length === 0 ? (
                <div>Không có lời mời kết bạn nào</div>
            ) : (
                requestFriends.map((request: IFriendRequest) => (
                    <div key={request._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
                        <p>ID: {request._id}</p>
                        <p>Status: {request.status}</p>
                        <p>Sender: {typeof request.sender === 'string' ? request.sender : request.sender?.username}</p>
                        <p>Receiver: {typeof request.receiver === 'string' ? request.receiver : request.receiver?.username}</p>
                    </div>
                ))
            )}
        </div>
    )
} 
