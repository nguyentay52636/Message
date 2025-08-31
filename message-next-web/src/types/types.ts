export interface IUser {
    _id?: string
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

  export interface IFriend { 
    sender: string;
    receiver: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Date;
    updatedAt: Date;
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
  

  export interface IFriendRequest {
    sender : string
    receiver : string
    status? : string
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