import axios from "axios"
import baseApi from "@/apis/baseApi" 
import { IUser } from "@/types/types"

export const LoginAPI  = async (userData :{phone : string, password : string}) => {
   try {
    const {data} = await baseApi.post("/auth/login", userData)
    return data
   } catch (error: any) {
    throw new Error(error);
   }
}
export const registerAPI = async ({email,username, password, phone}: IUser) => { 
    try {
        const newUser = {email,username, password, phone}  
        console.log("🚀 Sending to server:", newUser)
        const {data} = await baseApi.post('/auth/register', newUser)
        return data
    }catch(error :any) { 
        console.error("❌ API Error:", error.response?.data || error.message)
        throw new Error(error.response?.data?.message || error.message);
    }
} 
export const logout = async () => { 
    try {
        const {data} = await baseApi.post('/auth/logout')
        return data
    }catch(error :any) { 
        throw new Error(error);
    }
}   
