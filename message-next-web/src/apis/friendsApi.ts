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
export const getAllFriendRequestUser = async (userId :string) => { 
    try {
        const {data} = await baseApi.get(`/friendsRequest/user/${userId}`)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }   
} 
export const acceptFriendRequest = async (id:string,friendRequest: IFriendRequest) => {  
    const {sender,receiver} = friendRequest;
    if(!id) {
        throw new Error("Id is required")
    }
    if(!sender || !receiver) {
        throw new Error("Sender and receiver are required")
    }

    try {
        const newFriendRequest = {sender,receiver}
        const {data} = await baseApi.post(`/friendsRequest/accept/${id}`,newFriendRequest)
        return data
    }catch(error:any){
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
