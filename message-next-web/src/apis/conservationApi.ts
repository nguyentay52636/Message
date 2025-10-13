import { 
  IConversation, 
  ConversationCreateRequest, 
  ConversationUpdateRequest, 
  AddMemberRequest,
  ApiResponse 
} from "@/types/types";
import baseApi from "./baseApi";
import type { AxiosError, AxiosResponse } from "axios";

export const addConversation = async (conversation: ConversationCreateRequest): Promise<IConversation> => {
  try {
    const { data } = await baseApi.post<ApiResponse<IConversation>>("/conversations", conversation);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to create conversation');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to create conversation';
    throw new Error(message);
  }
};

// (for admin)
export const getAllConversations = async (): Promise<IConversation[]> => {
  try {
    const response: AxiosResponse<ApiResponse<IConversation[]>> = await baseApi.get("/conversations");
    const { data } = response;
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch conversations');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to fetch conversations';
    throw new Error(message);
  }
};


export const getConversationOfUser = async (userId: string): Promise<IConversation[]> => {
  try {
    const response: AxiosResponse<ApiResponse<IConversation[]> | { status: number; data?: IConversation[]; message?: string }> = await baseApi.get(`/conversations/user/${userId}`);
    const { data } = response;

    if ('status' in data) {
      if (data.status === 200 && data.data) return data.data;
      throw new Error(data.message || 'Failed to fetch user conversations');
    }

    if (data.success && data.data) {
      return data.data;
    }

    throw new Error(data.message || 'Failed to fetch user conversations');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to fetch user conversations';
    throw new Error(message);
  }
};

// Get conversation between two users
export const getConversationBetweenUsers = async (userId1: string, userId2: string): Promise<IConversation> => {
  try {
    const response: AxiosResponse<ApiResponse<IConversation>> = await baseApi.get(`/conversations/between/${userId1}/${userId2}`);
    const { data } = response;
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'No conversation found between users');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to fetch conversation between users';
    throw new Error(message);
  }
};

// Update conversation information
export const updateConversation = async (
  conversationId: string,
  updates: ConversationUpdateRequest
): Promise<IConversation> => {
  try {
    const response: AxiosResponse<ApiResponse<IConversation>> = await baseApi.put(`/conversations/${conversationId}`, updates);
    const { data } = response;
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to update conversation');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to update conversation';
    throw new Error(message);
  }
};

// Delete conversation
export const deleteConversation = async (conversationId: string): Promise<string> => {
  try {
    const response: AxiosResponse<ApiResponse<string>> = await baseApi.delete(`/conversations/${conversationId}`);
    const { data } = response;
    if (data.success) {
      return data.message || 'Conversation deleted successfully';
    }
    throw new Error(data.message || 'Failed to delete conversation');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to delete conversation';
    throw new Error(message);
  }
};

// Add member to group conversation
export const addMemberToConversation = async (conversationId: string, userId: string): Promise<IConversation> => {
  try {
    const payload: AddMemberRequest = { userId };
    const response: AxiosResponse<ApiResponse<IConversation>> = await baseApi.post(`/conversations/${conversationId}/addMember`, payload);
    const { data } = response;
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to add member to conversation');
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || axiosError.message || 'Failed to add member to conversation';
    throw new Error(message);
  }
};