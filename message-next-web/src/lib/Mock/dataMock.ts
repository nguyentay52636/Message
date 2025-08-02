export interface ChatUser {
    id: string
    name: string
    avatar: string
    lastMessage: string
    timestamp: string
    unreadCount?: number
    isOnline?: boolean
    isPinned?: boolean
    messageType?: "text" | "image" | "video" | "sticker" | "file"
  }
 export const mockUsers: ChatUser[] = [
    {
      id: "emmm-yeuu",
      name: "Emmm YeuuD",
      avatar: "/placeholder.svg?height=48&width=48&text=EY",
      lastMessage: "nó chơi chơi",
      timestamp: "23:21",
      messageType: "text",
      isOnline: true,
    },
    {
      id: "cbsv2-2024",
      name: "CBSV2 [2024 - ∞]",
      avatar: "/placeholder.svg?height=48&width=48&text=CB",
      lastMessage: "Ai Thy: Ôc sến bỏ lên quyển sách...",
      timestamp: "5 ngày",
      isPinned: true,
      messageType: "text",
      isOnline: true,
    },
    {
      id: "phai-hong-2-troi",
      name: "Phải hong z trời",
      avatar: "/placeholder.svg?height=48&width=48&text=PH",
      lastMessage: "Bạn: okay đợi xíu anh gửi nha",
      timestamp: "23:21",
      messageType: "text",
    },
    {
      id: "em-tin-anh",
      name: "Em tin anh",
      avatar: "/placeholder.svg?height=48&width=48&text=ET",
      lastMessage: "Bạn: Tin chứ, sao không tin 😊",
      timestamp: "23:24",
      messageType: "text",
    },
    {
      id: "1",
      name: "Bảy báo DCT1221",
      avatar: "/placeholder.svg?height=48&width=48&text=BB",
      lastMessage:
        "🎯 Quyền lợi: Được cộng 02 điểm rèn luyện ở HK1 năm học 2025 - 2026 vào mục *Tham gia các hoạt động đặc biệt do nhà trường huy động.",
      timestamp: "07:30",
      messageType: "text",
      unreadCount: 5,
    },
    {
      id: "2",
      name: "ĐĂNG BÀI Newlive",
      avatar: "/placeholder.svg?height=48&width=48&text=DN",
      lastMessage: "Dung Pham: 📷 Hình ảnh",
      timestamp: "6 phút",
      messageType: "image",
      unreadCount: 1,
    },
    {
      id: "3",
      name: "BUỔI THỌ IT",
      avatar: "/placeholder.svg?height=48&width=48&text=BT",
      lastMessage: "Bạn: ngồi đây",
      timestamp: "9 phút",
      messageType: "text",
    },
    {
      id: "4",
      name: "Lan Phương",
      avatar: "/placeholder.svg?height=48&width=48&text=LP",
      lastMessage: "Bạn: chờ chút quen chỉ",
      timestamp: "9 phút",
      messageType: "text",
    },
    {
      id: "5",
      name: "Gió Hàng Cần Hộ Newli...",
      avatar: "/placeholder.svg?height=48&width=48&text=GH",
      lastMessage: "Khánh Vy 칸비 Nlteam: --//--",
      timestamp: "11 phút",
      messageType: "text",
      unreadCount: 3,
    },
  ]
  