
interface ChatUser {
    id: string
    name: string
    avatar: string
    lastMessage: string
    timestamp: string
    unreadCount?: number
    isOnline?: boolean
    isPinned?: boolean
    status?: string
    groupInfo?: string
    messageType?: "text" | "image" | "video" | "sticker" | "file"
  }
  
  interface Message {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
    type: "text" | "image" | "sticker" | "file" | "video"
    senderName?: string
    avatar?: string
    isRead?: boolean
  }
export const mockUsers: ChatUser[] = [
    {
      id: "1",
      name: "Bảy báo DCT1221",
      avatar: "/placeholder.svg?height=48&width=48&text=BB",
      lastMessage: "Chưa có tin nhắn",
      timestamp: "",
      messageType: "text",
    },
    {
      id: "2",
      name: "CBSV2 [2024 - ∞]",
      avatar: "/placeholder.svg?height=48&width=48&text=CB",
      lastMessage: "Chưa có tin nhắn",
      timestamp: "",
      isPinned: true,
      messageType: "text",
      isOnline: true,
    },
    {
      id: "3",
      name: "Gió Hàng Cần Hộ N...",
      avatar: "/placeholder.svg?height=48&width=48&text=GH",
      lastMessage: "Khánh Vy 칸비 Nlteam: --//--",
      timestamp: "2 phút",
      messageType: "text",
    },
    {
      id: "4",
      name: "KTX-404/49 Nguyễn Đình ...",
      avatar: "/placeholder.svg?height=48&width=48&text=KT",
      lastMessage: "Điệp Nabi: @All phân thông tin ...",
      timestamp: "",
      messageType: "text",
      unreadCount: 24,
    },
    {
      id: "5",
      name: "Han Crazy 14tr 2PN q3 ở liề...",
      avatar: "/placeholder.svg?height=48&width=48&text=HC",
      lastMessage: "Bạn: 📷 Hình ảnh",
      timestamp: "",
      messageType: "image",
    },
    {
      id: "6",
      name: "Ánh Của Tây",
      avatar: "/placeholder.svg?height=48&width=48&text=AC",
      lastMessage: "Bạn: ▶️ Video",
      timestamp: "",
      messageType: "video",
      unreadCount: 1,
    },
    {
      id: "7",
      name: "Ann 13tr 1PN q1 22/7 hen x...",
      avatar: "/placeholder.svg?height=48&width=48&text=AN",
      lastMessage: "Bạn: E thấy căn này rộng tiện đi lại...",
      timestamp: "",
      messageType: "text",
    },
    {
      id: "8",
      name: "NewLive Trao Đổi",
      avatar: "/placeholder.svg?height=48&width=48&text=NL",
      lastMessage: "Ngọc Danh Newlive: ▶️ Video",
      timestamp: "",
      messageType: "video",
    },
    {
      id: "9",
      name: "Jack 10tr 2PN BT t8",
      avatar: "/placeholder.svg?height=48&width=48&text=JK",
      lastMessage: "Bạn: chung cư này ổn nè e",
      timestamp: "",
      messageType: "text",
    },
    {
      id: "10",
      name: "Emmm Yeuu🥰",
      avatar: "/placeholder.svg?height=48&width=48&text=EM",
      lastMessage: "😊 Bạn: 📷 Sticker",
      timestamp: "",
      messageType: "sticker",
    },
  ]

// Sample chat data for different conversations
export const chatData: { [key: string]: Message[] } = {
    "1": [
        {
            id: "1",
            content: "Chào bạn! Mình là Bảy báo DCT1221",
            sender: "other",
            timestamp: "10:30",
            type: "text",
            senderName: "Bảy báo DCT1221",
            avatar: "/placeholder.svg?height=32&width=32&text=BB",
        },
        {
            id: "2",
            content: "Chào bạn! Rất vui được gặp bạn",
            sender: "user",
            timestamp: "10:32",
            type: "text",
            isRead: true,
        },
    ],
    "2": [
        {
            id: "1",
            content: "Chào mừng bạn đến với nhóm CBSV2!",
            sender: "other",
            timestamp: "09:15",
            type: "text",
            senderName: "CBSV2",
            avatar: "/placeholder.svg?height=32&width=32&text=CB",
        },
        {
            id: "2",
            content: "Cảm ơn bạn! Rất vui được tham gia nhóm",
            sender: "user",
            timestamp: "09:20",
            type: "text",
            isRead: true,
        },
    ],
    "3": [
        {
            id: "1",
            content: "Khánh Vy 칸비 Nlteam: --//--",
            sender: "other",
            timestamp: "08:45",
            type: "text",
            senderName: "Gió Hàng Cần",
            avatar: "/placeholder.svg?height=32&width=32&text=GH",
        },
        {
            id: "2",
            content: "Có gì mới không bạn?",
            sender: "user",
            timestamp: "08:50",
            type: "text",
            isRead: true,
        },
    ],
    "4": [
        {
            id: "1",
            content: "Điệp Nabi: @All phân thông tin mới",
            sender: "other",
            timestamp: "07:30",
            type: "text",
            senderName: "KTX-404",
            avatar: "/placeholder.svg?height=32&width=32&text=KT",
        },
        {
            id: "2",
            content: "Cảm ơn bạn đã chia sẻ!",
            sender: "user",
            timestamp: "07:35",
            type: "text",
            isRead: false,
        },
    ],
    "5": [
        {
            id: "1",
            content: "Chào bạn! Mình có căn hộ 2PN ở quận 3",
            sender: "other",
            timestamp: "11:30",
            type: "text",
            senderName: "Han Crazy",
            avatar: "/placeholder.svg?height=32&width=32&text=HC",
        },
        {
            id: "2",
            content: "Giá 14tr/tháng, gần trung tâm, tiện đi lại",
            sender: "other",
            timestamp: "11:31",
            type: "text",
            senderName: "Han Crazy",
            avatar: "/placeholder.svg?height=32&width=32&text=HC",
        },
        {
            id: "3",
            content: "Chào bạn! Mình có video về căn hộ mới",
            sender: "other",
            timestamp: "11:32",
            type: "text",
            senderName: "Han Crazy",
            avatar: "/placeholder.svg?height=32&width=32&text=HC",
        },
        {
            id: "4",
            content: "Video tour căn hộ",
            sender: "user",
            timestamp: "13:15",
            type: "video",
            isRead: true,
        },
        {
            id: "5",
            content: "Video rất chi tiết, cảm ơn bạn!",
            sender: "other",
            timestamp: "13:20",
            type: "text",
            senderName: "Han Crazy",
            avatar: "/placeholder.svg?height=32&width=32&text=HC",
        },
        {
            id: "6",
            content: "Căn này có sẵn nội thất không bạn?",
            sender: "other",
            timestamp: "13:25",
            type: "text",
            senderName: "Han Crazy",
            avatar: "/placeholder.svg?height=32&width=32&text=HC",
        },
    ],
    "6": [
        {
            id: "1",
            content: "Chào bạn! Mình có video mới",
            sender: "other",
            timestamp: "14:20",
            type: "text",
            senderName: "Ánh Của Tây",
            avatar: "/placeholder.svg?height=32&width=32&text=AC",
        },
        {
            id: "2",
            content: "Video mới",
            sender: "user",
            timestamp: "14:25",
            type: "video",
            isRead: false,
        },
    ],
    "7": [
        {
            id: "1",
            content: "E thấy căn này rộng tiện đi lại",
            sender: "user",
            timestamp: "15:10",
            type: "text",
            isRead: true,
        },
        {
            id: "2",
            content: "Vâng, căn này rất tiện lợi",
            sender: "other",
            timestamp: "15:15",
            type: "text",
            senderName: "Ann",
            avatar: "/placeholder.svg?height=32&width=32&text=AN",
        },
    ],
    "8": [
        {
            id: "1",
            content: "Ngọc Danh Newlive: ▶️ Video",
            sender: "other",
            timestamp: "16:00",
            type: "text",
            senderName: "NewLive Trao Đổi",
            avatar: "/placeholder.svg?height=32&width=32&text=NL",
        },
    ],
    "9": [
        {
            id: "1",
            content: "chung cư này ổn nè e",
            sender: "user",
            timestamp: "17:30",
            type: "text",
            isRead: true,
        },
    ],
    "10": [
        {
            id: "1",
            content: "😊 Bạn: 📷 Sticker",
            sender: "user",
            timestamp: "18:00",
            type: "text",
            isRead: true,
        },
    ],
}
  
   export const welcomeSlides = [
    {
      title: "Chào mừng đến với Zalo PC!",
      description:
        "Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người thân, bạn bè được tối ưu hóa cho máy tính của bạn.",
      image: "/welcome-illustration.png",
      feature: "Gửi File nặng?",
      subtext: 'Đã có Zalo PC "xử" hết',
    },
    {
      title: "Nhắn tin nhiều hơn, soạn thảo ít hơn",
      description: "Sử dụng Tin Nhắn Nhanh để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.",
      image: "/chat-illustration-1.png",
      feature: "Tin Nhắn Nhanh",
      subtext: "Tiết kiệm thời gian soạn thảo",
    },
    {
      title: "Chia sẻ màn hình dễ dàng",
      description:
        "Chia sẻ màn hình máy tính trong cuộc gọi video để thuyết trình, hướng dẫn hoặc cùng nhau xem nội dung.",
      image: "/screen-share-illustration.png",
      feature: "Chia sẻ màn hình",
      subtext: "Làm việc nhóm hiệu quả hơn",
    },
  ]