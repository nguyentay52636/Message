import baseApi from "./baseApi";
import { IMessage } from "@/types/types";
import type { AxiosError, AxiosResponse } from "axios";

export interface IUploadImageResponse {
  imageId: string;
  fileUrl: string;
}

export interface IReplyMessage {
  conversationId: string;
  content: string;
  replyTo: string;
  messageType?: 'text' | 'image' | 'file';
  imageId?: string;
}

export interface IForwardMessage {
  messageId: string;
  targetConversationId: string;
}

export const getMessageInConversation = async (conversationId: string) => {
  if (!conversationId) {
    throw new Error("ConversationId is required")
  }
  try {
    const response: AxiosResponse<{ data?: IMessage[]; message?: string }> = await baseApi.get(`/${conversationId}`)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

export const sendMessage = async (conversationId: string, message: IMessage) => {
  const { sender, content } = message;
  if (!sender || !conversationId || !content) {
    throw new Error("Sender, conversationId and content are required")
  }
  try {
    const response: AxiosResponse<{ data?: IMessage; message?: string }> = await baseApi.post(`/send`, message)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

export const uploadImage = async (userId: string, file: File) => {
  if (!userId || !file) {
    throw new Error("UserId and file are required")
  }

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('image', file);

  try {
    const response: AxiosResponse<{ data?: IUploadImageResponse; message?: string }> = await baseApi.post('/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

// Create reply message
export const createReplyMessage = async (replyData: IReplyMessage) => {
  const { conversationId, content, replyTo } = replyData;
  if (!conversationId || !content || !replyTo) {
    throw new Error("ConversationId, content and replyTo are required")
  }
  try {
    const response: AxiosResponse<{ data?: IMessage; message?: string }> = await baseApi.post('/reply', replyData)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

// Mark messages as read
export const markMessagesAsRead = async (conversationId: string, senderId: string) => {
  if (!conversationId || !senderId) {
    throw new Error("ConversationId and senderId are required")
  }
  try {
    const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.put(`/${conversationId}/read`, { senderId })
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

export const recallMessage = async (messageId: string) => {
  if (!messageId) {
    throw new Error("MessageId is required")
  }
  try {
    const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.put(`/recall/${messageId}`)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

export const forwardMessage = async (forwardData: IForwardMessage) => {
  const { messageId, targetConversationId } = forwardData;
  if (!messageId || !targetConversationId) {
    throw new Error("MessageId and targetConversationId are required")
  }
  try {
    const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.post('/forward', forwardData)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}

export const deleteMessage = async (messageId: string) => {
  if (!messageId) {
    throw new Error("MessageId is required")
  }
  try {
    const response: AxiosResponse<{ data?: unknown; message?: string }> = await baseApi.delete(`/${messageId}`)
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>
    throw new Error(axiosError.response?.data?.message || axiosError.message)
  }
}   