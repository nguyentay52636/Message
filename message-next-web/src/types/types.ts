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
  export interface IConversation {
    _id: string;
    type: 'personal' | 'group';
    members: string[];
    groupName?: string;
    groupAvatar?: string;
    groupAdmin?: string;
    lastMessage?: string;
    lastUpdated: Date;
    createdAt: Date;
    updatedAt: Date;
  }