import { IUser } from "@/types/types"
import baseApi from "./baseApi"

export const getUserById = async (id:string) => { 
    if(!id) {
        throw new Error("Id is required")
    }
    try {
        const {data} = await baseApi.get(`/user/${id}`)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}
export const getAllUser = async () => { 
    try {
        const {data} = await baseApi.get(`/user`)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}   
export const addUser = async (user:IUser) => { 
    const {username,email,phone,password} = user;
    if(!username || !email || !phone || !password) {
        throw new Error("Username, email, phone and password are required")
    }
    if(!user) {
        throw new Error("User is required")
    }
    try {
        const newUser = {username,email,phone,password}
        const {data} = await baseApi.post(`/user`,newUser)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}
export const updateUser = async (id:string,user:IUser) => { 
    const {username,email,phone,password} = user;
    if(!username || !email || !phone || !password) {
        throw new Error("Username, email, phone and password are required")
    }
    if(!id) {
        throw new Error("Id is required")
    }
    if(!user) {
        throw new Error("User is required")
    }
    try {
        const newUser = {username,email,phone,password}    
        const {data} = await baseApi.put(`/user/${id}`,newUser)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}
export const deleteUser = async (id:string) => { 
    if(!id) {
        throw new Error("Id is required")
    }
    try {
        const {data} = await baseApi.delete(`/user/${id}`)
        return data
    }catch(error:any){
        throw new Error(error.message)
    }
}