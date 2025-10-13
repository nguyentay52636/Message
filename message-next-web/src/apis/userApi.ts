import { IUser } from "@/types/types"
import baseApi from "./baseApi"
import type { AxiosError, AxiosResponse } from "axios"

export const getUserById = async (id:string) => { 
    if(!id) {
        throw new Error("Id is required")
    }
    try {
        const response: AxiosResponse<{ data?: IUser; message?: string }> = await baseApi.get(`/user/${id}`)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
}
export const getAllUser = async () => { 
    try {
        const response: AxiosResponse<{ data?: IUser[]; message?: string }> = await baseApi.get(`/user`)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
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
        const response: AxiosResponse<{ data?: IUser; message?: string }> = await baseApi.post(`/user`,newUser)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
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
        const response: AxiosResponse<{ data?: IUser; message?: string }> = await baseApi.put(`/user/${id}`,newUser)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
}
export const deleteUser = async (id:string) => { 
    if(!id) {
        throw new Error("Id is required")
    }
    try {
        const response: AxiosResponse<{ data?: { deleted: boolean }; message?: string }> = await baseApi.delete(`/user/${id}`)
        return response.data
    }catch(error: unknown){
        const axiosError = error as AxiosError<{ message?: string }>
        throw new Error(axiosError.response?.data?.message || axiosError.message)
    }
}