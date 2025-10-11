export interface IUser {
    _id?: string
    id?: string  // Added for compatibility with authSlice
    username: string
    email: string
    phone: string
    password: string
    avatar?: string
    status?: string
    lastSeen?: Date;
    createdAt?: string
    updatedAt?: string

  }
export interface ILoginDataType {
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }
export interface ICall {
    callerId: string;
    receiverId: string;
    isAccepted: boolean;
  }


  export interface IGroup { 
    name: string;
    description: string;
    members: string[];
  }

  export interface IMessage {
    id?: string;
    sender: string;
    conversationId: string;
    content: string;
    mediaUrl?: string;
    imageId?: string;
    isRead?: boolean;
    readBy?: string[];
    replyTo?: string;
    messageType?: 'text' | 'image' | 'file' | 'audio' | 'video';
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface IFriend { 
    _id: string;
    sender: IUser;
    receiver: IUser;
    status: "pending" | "accepted" | "rejected";
    createdAt?: Date;
    updatedAt?: Date;
  }

  // Interface for friend list display
  export interface IFriendDisplay {
    _id: string;
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
    avatar?: string;
    status: "online" | "offline";
    lastSeen?: string;
    isOnline: boolean;
  }

  export interface IFriendRequest {
    _id?: string
    sender : string | IUser
    receiver : string | IUser
    status: "pending" | "accepted" | "rejected";
    createdAt? : Date
    updatedAt?: Date
     } 
  export interface IConversation {
    _id: string;
    type: 'personal' | 'group';
    members: string[] | IUser[];
    groupName?: string;
    groupAvatar?: string;
    groupAdmin?: string | IUser;
    lastMessage?: IMessage;
    lastUpdated: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }

  // API Response interfaces
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
  }

  export interface ConversationCreateRequest {
    members: string[];
    type: 'personal' | 'group';
    groupName?: string;
    groupAvatar?: string;
    groupAdmin?: string;
  }

  export interface ConversationUpdateRequest {
    groupName?: string;
    groupAvatar?: string;
    groupAdmin?: string;
  }

  export interface AddMemberRequest {
    userId: string;
  }

  // Interface for conversation display in chat list
  export interface IConversationDisplay {
    _id: string;
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unreadCount?: number;
    isOnline?: boolean;
    isPinned?: boolean;
    messageType?: "text" | "image" | "video" | "sticker" | "file";
    type: 'personal' | 'group';
    members: IUser[];
    lastUpdated: Date;
  }