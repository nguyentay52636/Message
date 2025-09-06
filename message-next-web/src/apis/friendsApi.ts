import { ReactJsxRuntime } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";
import baseApi from "./baseApi"
import { IFriendRequest } from "@/types/types"

 export const addRequestFriend = async (friendRequest: IFriendRequest) => { 
    const {sender,receiver} = friendRequest;
   if(!sender || !receiver) {
    throw new Error("Sender and receiver are required")
   }
    try {
        const newRequest =      {sender,receiver}; 
        const {data} = await baseApi.post("/friendsRequest/", newRequest)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
 }  
 export const getUserByPhone = async (phone: string) => {  
    const params = {phone} ; 
    try {
        const {data} = await baseApi.get(`search`,{params})
        return data
    }catch(error:any){
        throw new Error(error.message)
    }   
  } 
export const getAllFriendRequestUser = async (userId: string) => { 
    try {
        console.log('=== DEBUG getAllFriendRequestUser ===')
        console.log('userId received:', userId)
        console.log('userId type:', typeof userId)
        
        if (!userId) {
            console.error('User ID is missing or empty')
            throw new Error("User ID is required")
        }
        
        console.log('Making API call to:', `/friendsRequest/user/${userId}`)
        const {data} = await baseApi.get(`/friendsRequest/user/${userId}`)
        console.log('API response data:', data)
        console.log('API response data type:', typeof data)
        console.log('API response data length:', Array.isArray(data) ? data.length : 'Not an array')
        
        return data
    } catch(error: any) {
        console.error('=== ERROR in getAllFriendRequestUser ===')
        console.error('Error object:', error)
        console.error('Error message:', error.message)
        console.error('Error response:', error.response)
        console.error('Error status:', error.response?.status)
        console.error('Error data:', error.response?.data)
        
        if (error.response?.status === 404) {
            throw new Error("Không tìm thấy lời mời kết bạn")
        } else if (error.response?.status === 401) {
            throw new Error("Bạn cần đăng nhập để xem lời mời kết bạn")
        } else if (error.response?.status >= 500) {
            throw new Error("Lỗi server, vui lòng thử lại sau")
        }
        
        throw new Error(error.message || "Có lỗi xảy ra khi tải danh sách lời mời kết bạn")
    }   
} 
export const acceptFriendRequest = async (id:string) => {  
 try { 
    const {data} = await baseApi.put(`/friendsRequest/accept/${id}`)
    return data
 }catch (error :any ) { 
    throw new Error(error.message)
 }
} 
export const refuseFriendRequest = async (id:string) => {  
    try {
        const {data} = await baseApi.delete(`/friendsRequest/${id}`)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
} 

export const getAllFriendByUserId =  async (userId:string) => {
    try {
        const {data} = await baseApi.get(`/friendsRequest/friends/${userId}`)
        if(data.success && data.data) {
            return data.data
        }
        throw new Error(data.message || "Failed to fetch friends")
    }catch(error:any){  
        throw new Error(error.message)
    }
}