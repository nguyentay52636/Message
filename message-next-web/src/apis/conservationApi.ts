import { 
  IConversation, 
  ConversationCreateRequest, 
  ConversationUpdateRequest, 
  AddMemberRequest,
  ApiResponse 
} from "@/types/types";
import baseApi from "./baseApi";

export const addConversation = async (conversation: ConversationCreateRequest): Promise<IConversation> => {
  try {
    const { data } = await baseApi.post<ApiResponse<IConversation>>("/conversations", conversation);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to create conversation');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to create conversation');
  }
};

// (for admin)
export const getAllConversations = async (): Promise<IConversation[]> => {
  try {
    const { data } = await baseApi.get<ApiResponse<IConversation[]>>("/conversations");
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch conversations');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch conversations');
  }
};

// Get conversations of specific user
export const getConversationOfUser = async (userId: string): Promise<IConversation[]> => {
  try {
    const { data } = await baseApi.get<ApiResponse<IConversation[]>>(`/conversations/user/${userId}`);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to fetch user conversations');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch user conversations');
  }
};

// Get conversation between two users
export const getConversationBetweenUsers = async (userId1: string, userId2: string): Promise<IConversation> => {
  try {
    const { data } = await baseApi.get<ApiResponse<IConversation>>(`/conversations/between/${userId1}/${userId2}`);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'No conversation found between users');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch conversation between users');
  }
};

// Update conversation information
export const updateConversation = async (
  conversationId: string,
  updates: ConversationUpdateRequest
): Promise<IConversation> => {
  try {
    const { data } = await baseApi.put<ApiResponse<IConversation>>(`/conversations/${conversationId}`, updates);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to update conversation');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update conversation');
  }
};

// Delete conversation
export const deleteConversation = async (conversationId: string): Promise<string> => {
  try {
    const { data } = await baseApi.delete<ApiResponse<string>>(`/conversations/${conversationId}`);
    if (data.success) {
      return data.message || 'Conversation deleted successfully';
    }
    throw new Error(data.message || 'Failed to delete conversation');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to delete conversation');
  }
};

// Add member to group conversation
export const addMemberToConversation = async (conversationId: string, userId: string): Promise<IConversation> => {
  try {
    const { data } = await baseApi.post<ApiResponse<IConversation>>(`/conversations/${conversationId}/addMember`, {
      userId,
    } as AddMemberRequest);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to add member to conversation');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to add member to conversation');
  }
};