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
    "minh-anh": {
      id: "minh-anh",
      name: "Minh Anh",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "Mai đi xem phim không?",
      timestamp: "20:45",
      messageType: "text",
      isOnline: true,
    },
    "minh-anh-2": {
      id: "minh-anh",
      name: "Minh Anh",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "Mai đi xem phim không?",
      timestamp: "20:45",
      messageType: "text",
      isOnline: true,
    },
    "minh-anh-3": {
      id: "minh-anh-3",
      name: "Minh Anh",
      avatar: "https://i.pravatar.cc/150?img=11",
      lastMessage: "Mai đi xem phim không?",
      timestamp: "20:45",
      messageType: "text",
      isOnline: true,
    },
    "ngoc-linh": {
      id: "ngoc-linh",
      name: "Ngọc Linh",
      avatar: "https://i.pravatar.cc/150?img=12",
      lastMessage: "Ừm, gửi cho tớ file nhé!",
      timestamp: "Hôm qua",
      messageType: "text",
      isOnline: false,
    },
    "tuan-kiet": {
      id: "tuan-kiet",
      name: "Tuấn Kiệt",
      avatar: "https://i.pravatar.cc/150?img=13",
      lastMessage: "Ok deal nhé 💯",
      timestamp: "09:10",
      messageType: "text",
      unreadCount: 2,
      isOnline: true,
    },
    "thao-my": {
      id: "thao-my",
      name: "Thảo My",
      avatar: "https://i.pravatar.cc/150?img=14",
      lastMessage: "Mình vừa về tới rồi nè 😆",
      timestamp: "22:15",
      messageType: "text",
      isOnline: true,
    },
    "nhom-dct2025": {
      id: "nhom-dct2025",
      name: "DCT 2025 - Team",
      avatar: "https://i.pravatar.cc/150?img=15",
      lastMessage: "Phúc: Mai họp lúc 8h nha mn",
      timestamp: "2 ngày",
      messageType: "text",
      isPinned: true,
      isOnline: true,
    },
    "bao-long": {
      id: "bao-long",
      name: "Bảo Long",
      avatar: "https://i.pravatar.cc/150?img=16",
      lastMessage: "Gửi mình số tài khoản nhé",
      timestamp: "07:30",
      messageType: "text",
      unreadCount: 3,
      isOnline: false,
    },
    "hoai-thuong": {
      id: "hoai-thuong",
      name: "Hoài Thương",
      avatar: "https://i.pravatar.cc/150?img=17",
      lastMessage: "Đã nhận được, cảm ơn nhiều 🙏",
      timestamp: "15:42",
      messageType: "text",
      isOnline: true,
    },
  };
  
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
    "emmm-yeuu-2": [
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
    "emmm-yeuua-2": [
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
  }
