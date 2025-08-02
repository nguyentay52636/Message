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
  export interface Message {
    id: string
    content: string
    sender: "user" | "other"
    timestamp: string
    type: "text" | "image" | "sticker" | "file" | "video"
    senderName?: string
    avatar?: string
    isRead?: boolean
  }

  export const mockUsers: { [key: string]: ChatUser } = {
  "emmm-yeuu": {
    id: "emmm-yeuu",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "emmm-yeuua": {
    id: "emmm-yeuua",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "emmm-yeuvu": {
    id: "emmm-yeuvu",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "emmm-yvveuu": {
    id: "emmm-yvveuu",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "emmm-áyeuu": {
    id: "emmm-áyeuu",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "emmm-yeádfuu": {
    id: "emmm-yeádfuu",
    name: "Emmm YeuuD",
    avatar: "/placeholder.svg?height=48&width=48&text=EY",
    lastMessage: "nó chơi chơi",
    timestamp: "23:21",
    messageType: "text",
    isOnline: true,
  },
  "cbsv2-2024": {
    id: "cbsv2-2024",
    name: "CBSV2 [2024 - ∞]",
    avatar: "/placeholder.svg?height=48&width=48&text=CB",
    lastMessage: "Ai Thy: Ôc sến bỏ lên quyển sách...",
    timestamp: "5 ngày",
    isPinned: true,
    messageType: "text",
    isOnline: true,
  },
  "phai-hong-2-troi": {
    id: "phai-hong-2-troi",
    name: "Phải hong z trời",
    avatar: "/placeholder.svg?height=48&width=48&text=PH",
    lastMessage: "Bạn: okay đợi xíu anh gửi nha",
    timestamp: "23:21",
    messageType: "text",
  },
  "em-tin-anh": {
    id: "em-tin-anh",
    name: "Em tin anh",
    avatar: "/placeholder.svg?height=48&width=48&text=ET",
    lastMessage: "Bạn: Tin chứ, sao không tin 😊",
    timestamp: "23:24",
    messageType: "text",
  },
  "1": {
    id: "1",
    name: "Bảy báo DCT1221",
    avatar: "/placeholder.svg?height=48&width=48&text=BB",
    lastMessage: "🎯 Quyền lợi: Được cộng 02 điểm rèn luyện...",
    timestamp: "07:30",
    messageType: "text",
    unreadCount: 5,
  },
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
  export const chatData: { [key: string]: Message[] } = {
    "emmm-yeuu": [
      {
        id: "1",
        content:
          "Link : https://docs.google.com/spreadsheets/d/19D6RuMD05K8H9-Ss2wqVidON2NUi7i39T7zlWkgtM10/edit?usp=sharing",
        sender: "user",
        timestamp: "23:18",
        type: "text",
        isRead: true,
      },
      {
        id: "2",
        content: "khách nhiều ghê em",
        sender: "other",
        timestamp: "23:18",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
      {
        id: "3",
        content: "Đã z anh",
        sender: "user",
        timestamp: "23:19",
        type: "text",
        isRead: true,
      },
      {
        id: "4",
        content: "mai anh dẫn khách 8h30 1 tháng sáng 1h chiều chung cư",
        sender: "other",
        timestamp: "23:20",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
      {
        id: "5",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
      {
        id: "6",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
      {
        id: "7",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
      },
      {
        id: "8",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
      },
      {
        id: "9",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
      },
    ],
    "emmm-yeuua": [
      {
        id: "1",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
    ],
    "emmm-yeuvu": [
      {
        id: "1",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
    ],
    "emmm-yvveuu": [
      {
        id: "1",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
    ],
    "emmm-áyeuu": [
      {
        id: "1",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
    ],
    "emmm-yeádfuu": [
      {
        id: "1",
        content: "nó chơi chơi",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Emmm YeuuD",
        avatar: "/placeholder.svg?height=32&width=32&text=EY",
      },
    ],
    "cbsv2-2024": [
      {
        id: "1",
        content: "Ôc sến bỏ lên quyển sách rồi các bạn ơi 😅",
        sender: "other",
        timestamp: "5 ngày trước",
        type: "text",
        senderName: "Ai Thy",
        avatar: "/placeholder.svg?height=32&width=32&text=AT",
      },
      {
        id: "2",
        content: "Haha, đúng rồi! Mình cũng vậy",
        sender: "other",
        timestamp: "5 ngày trước",
        type: "text",
        senderName: "Minh Anh",
        avatar: "/placeholder.svg?height=32&width=32&text=MA",
      },
      {
        id: "3",
        content: "Ai cũng thế cả thôi 😂",
        sender: "user",
        timestamp: "5 ngày trước",
        type: "text",
        isRead: true,
      },
    ],
    "phai-hong-2-troi": [
      {
        id: "1",
        content: "Anh có thể gửi hình ảnh căn hộ được không?",
        sender: "other",
        timestamp: "23:21",
        type: "text",
        senderName: "Phải hong z trời",
        avatar: "/placeholder.svg?height=32&width=32&text=PH",
      },
      {
        id: "2",
        content: "okay đợi xíu anh gửi nha",
        sender: "user",
        timestamp: "23:21",
        type: "text",
        isRead: true,
      },
    ],
    "em-tin-anh": [
      {
        id: "1",
        content: "Em có tin anh không?",
        sender: "other",
        timestamp: "23:24",
        type: "text",
        senderName: "Em tin anh",
        avatar: "/placeholder.svg?height=32&width=32&text=ET",
      },
      {
        id: "2",
        content: "Tin chứ, sao không tin 😊",
        sender: "user",
        timestamp: "23:24",
        type: "text",
        isRead: true,
      },
    ],
    "1": [
      {
        id: "1",
        content:
          "🎯 Quyền lợi: Được cộng 02 điểm rèn luyện ở HK1 năm học 2025 - 2026 vào mục *Tham gia các hoạt động đặc biệt do nhà trường huy động.",
        sender: "other",
        timestamp: "07:30",
        type: "text",
        senderName: "Admin DCT1221",
        avatar: "/placeholder.svg?height=32&width=32&text=AD",
      },
      {
        id: "2",
        content:
          "📍 Địa điểm: Hội trường A, Cơ sở chính Trường Đại học Sài Gòn\n🕐 Thời gian: 07g30 - 09g30, ngày 02/8/2025 (thứ Bảy)",
        sender: "other",
        timestamp: "07:31",
        type: "text",
        senderName: "Admin DCT1221",
        avatar: "/placeholder.svg?height=32&width=32&text=AD",
      },
      {
        id: "3",
        content: "Cảm ơn thông tin!",
        sender: "user",
        timestamp: "07:35",
        type: "text",
        isRead: true,
      },
    ],
  }
