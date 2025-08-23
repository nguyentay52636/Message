    // Mock data
     export interface Friend {
        id: string
        name: string
        avatar: string
        isOnline: boolean
        lastSeen?: string
        mutualFriends?: number
    }
    
    export interface FriendRequest {
        id: string
        name: string
        avatar: string
        mutualFriends: number
        requestTime: string
    }
    
    export interface GroupInvitation {
        id: string
        groupName: string
        groupAvatar: string
        inviterName: string
        memberCount: number
        inviteTime: string
    }
    export const mockFriends: Friend[] = [
        {
            id: "1",
            name: "Bunny",
            avatar: "/placeholder.svg?height=48&width=48&text=B",
            isOnline: true,
        },
        {
            id: "2",
            name: "abcd",
            avatar: "/placeholder.svg?height=48&width=48&text=N",
            isOnline: false,
            lastSeen: "2 giờ trước",
        },
        {
            id: "3",
            name: "Phương nam",
            avatar: "/placeholder.svg?height=48&width=48&text=PA",
            isOnline: true,
        },
        {
            id: "4",
            name: "Tây",
            avatar: "/placeholder.svg?height=48&width=48&text=T",
            isOnline: false,
            lastSeen: "1 ngày trước",
        },
        {
            id: "5",
            name: "Zalo",
            avatar: "/placeholder.svg?height=48&width=48&text=Z",
            isOnline: true,
        },
        {
            id: "6",
            name: "An Nguyễn",
            avatar: "/placeholder.svg?height=48&width=48&text=AN",
            isOnline: true,
        },
        {
            id: "7",
            name: "Bảo Trần",
            avatar: "/placeholder.svg?height=48&width=48&text=BT",
            isOnline: false,
            lastSeen: "5 phút trước",
        },
        {
            id: "8",
            name: "Cường Đỗ",
            avatar: "/placeholder.svg?height=48&width=48&text=CD",
            isOnline: true,
        },
    ]

    export const mockFriendRequests: FriendRequest[] = [
        {
            id: "1",
            name: "Minh Hoàng",
            avatar: "/placeholder.svg?height=48&width=48&text=MH",
            mutualFriends: 12,
            requestTime: "2 giờ trước",
        },
        {
            id: "2",
            name: "Thu Hà",
            avatar: "/placeholder.svg?height=48&width=48&text=TH",
            mutualFriends: 8,
            requestTime: "1 ngày trước",
        },
        {
            id: "3",
            name: "Đức Anh",
            avatar: "/placeholder.svg?height=48&width=48&text=DA",
            mutualFriends: 5,
            requestTime: "3 ngày trước",
        },
    ]

    export const mockGroupInvitations: GroupInvitation[] = [
        {
            id: "1",
            groupName: "Nhóm Công Nghệ Việt Nam",
            groupAvatar: "/placeholder.svg?height=48&width=48&text=CNVN",
            inviterName: "Minh Anh",
            memberCount: 1247,
            inviteTime: "1 giờ trước",
        },
        {
            id: "2",
            groupName: "Cộng đồng Developer",
            groupAvatar: "/placeholder.svg?height=48&width=48&text=DEV",
            inviterName: "Hoàng Nam",
            memberCount: 856,
            inviteTime: "2 ngày trước",
        },
    ]