import baseApi from "./baseApi"
import { IFriend, IFriendRequest, IFriendDisplay, IUser } from "@/types/types"

 export const addRequestFriend = async (friendRequest: IFriendRequest) => { 
    const {sender,receiver} = friendRequest;
   if(!sender || !receiver) {
    throw new Error("Sender and receiver are required")
   }
    try {
        const newRequest =   {sender,receiver}; 
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

        if (!userId) {
            console.error('User ID is missing or empty')
            throw new Error("User ID is required")
        }
        
        const response = await baseApi.get(`/friendsRequest/user/${userId}`)
        const data = response.data?.data || response.data
        return data
    } catch(error: any) {        
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

export const getAllFriendByUserId =  async (userId:string)  : Promise<IFriendDisplay[]>=> {
    try {
        const {data} = await baseApi.get(`/friendsRequest/user-friends/${userId}`)
        if(data.status === 200 && data.data) {
            // Transform API data to display format
            const friends: IFriendDisplay[] = data.data.map((friend: IFriend) => {
                // Determine which user is the friend (not the current user)
                const friendUser = friend.sender._id === userId ? friend.receiver : friend.sender;
                
                return {
                    _id: friend._id,
                    id: friendUser._id,
                    name: friendUser.username,
                    username: friendUser.username,
                    email: friendUser.email,
                    phone: friendUser.phone,
                    avatar: friendUser.avatar || "",
                    status: friendUser.status === "online" ? "online" : "offline",
                    lastSeen: friendUser.lastSeen,
                    isOnline: friendUser.status === "online"
                };
            });
            
            return friends;
        }
        throw new Error(data.message || "Failed to fetch friends")
    }catch(error:any){  
        throw new Error(error.message)
    }
}