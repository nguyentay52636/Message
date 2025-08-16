import baseApi from "@/apis/baseApi" 
import { IUser } from "@/types/types"

export const LoginAPI  = async (userData :{phone : string, password : string}) => {
   try {
    const {data} = await baseApi.post("/auth/login", userData)
    return data
   } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("Đăng nhập thất bại");
   }
}

export const registerAPI = async ({email,username, password, phone}: IUser) => { 
    try {
        const newUser = {email,username, password, phone}  
        console.log("🚀 Sending to server:", newUser)
        const {data} = await baseApi.post('/auth/register', newUser)
        return data
    }catch(error: unknown) { 
        if (error && typeof error === 'object' && 'response' in error) {
            const responseError = error as { response?: { data?: { message?: string } } };
            throw new Error(responseError.response?.data?.message || "Đăng ký thất bại");
        }
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Đăng ký thất bại");
    }
} 

export const logout = async () => { 
    try {
        const {data} = await baseApi.post('/auth/logout')
        return data
    }catch(error: unknown) { 
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Đăng xuất thất bại");
    }
}   
