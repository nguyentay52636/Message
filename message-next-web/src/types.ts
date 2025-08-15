export interface IUser {
    _id?: string
    username: string
    email: string
    password: string
    phone: string
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