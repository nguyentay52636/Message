import baseApi from "./baseApi"
import { IFriend, IFriendRequest, IFriendDisplay } from "@/types/types"
import type { AxiosError, AxiosResponse } from "axios"

 export const addRequestFriend = async (friendRequest: IFriendRequest) => { 
    const {sender,receiver} = friendRequest;
   if(!sender || !receiver) {
    throw new Error("Sender and receiver are required")
   }
   try {
        const newRequest =   {sender,receiver}; 
        const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.post("/friendsRequest/", newRequest)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
 }  
 export const getUserByPhone = async (phone: string) => {  
    const params = {phone} ; 
   try {
        const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.get(`search`,{params})
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }   
  } 
export const getAllFriendRequestUser = async (userId: string): Promise<IFriendRequest[]> => { 
    try {

        if (!userId) {
            console.error('User ID is missing or empty')
            throw new Error("User ID is required")
        }
        
        const response: AxiosResponse<{ data?: IFriendRequest[]; message?: string; status?: number } | IFriendRequest[]> = await baseApi.get(`/friendsRequest/user/${userId}`)
        const raw = response.data as any
        const list: IFriendRequest[] = Array.isArray(raw) ? raw : (raw?.data ?? [])
        return list
    } catch(error: unknown) {        
        const axiosError = error as AxiosError<{ message?: string }>
        if (axiosError.response?.status === 404) {
            throw new Error("Không tìm thấy lời mời kết bạn")
        } else if (axiosError.response?.status === 401) {
            throw new Error("Bạn cần đăng nhập để xem lời mời kết bạn")
        } else if ((axiosError.response?.status || 0) >= 500) {
            throw new Error("Lỗi server, vui lòng thử lại sau")
        }
        
        throw new Error(axiosError.response?.data?.message || axiosError.message || "Có lỗi xảy ra khi tải danh sách lời mời kết bạn")
    }   
} 
export const acceptFriendRequest = async (id:string) => {  
 try { 
    const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.put(`/friendsRequest/accept/${id}`)
    return response.data
 }catch (error: unknown ) { 
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
 }
} 
export const refuseFriendRequest = async (id:string) => {  
    try {
        const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.delete(`/friendsRequest/${id}`)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
} 

export const getAllFriendByUserId =  async (userId:string)  : Promise<IFriendDisplay[]>=> {
    try {
        const response: AxiosResponse<{ status?: number; data?: IFriend[]; message?: string }> = await baseApi.get(`/friendsRequest/user-friends/${userId}`)
        const data = response.data
        if(data.status === 200 && data.data) {
            // Transform API data to display format
            const friends: IFriendDisplay[] = data.data.map((friend: IFriend) => {
                // Determine which user is the friend (not the current user)
                const friendUser = friend.sender._id === userId ? friend.receiver : friend.sender;
                
                return {
                    _id: friend._id,
                    id: friendUser._id || friendUser.id || "",
                    name: friendUser.username,
                    username: friendUser.username,
                    email: friendUser.email,
                    phone: friendUser.phone,
                    avatar: friendUser.avatar || "",
                    status: friendUser.status === "online" ? "online" : "offline",
                    lastSeen: friendUser.lastSeen ? new Date(friendUser.lastSeen).toISOString() : undefined,
                    isOnline: friendUser.status === "online"
                };
            });
            
            return friends;
        }
        throw new Error(data.message || "Failed to fetch friends")
    }catch(error: unknown){  
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
}