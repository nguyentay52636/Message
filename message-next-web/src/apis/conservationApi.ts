import { 
  IConversation, 
  ConversationCreateRequest, 
  ConversationUpdateRequest, 
  AddMemberRequest,
  ApiResponse,
  IUser
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

// Tìm user và tạo conversation khi gửi tin nhắn
export const findOrCreateConversation = async (senderId: string, receiverId: string): Promise<IConversation> => {
  try {
    // Tìm conversation hiện có giữa 2 user
    const existingConversations = await getConversationOfUser(senderId);
    const existingConversation = existingConversations.find(conv => 
      conv.members.some(member => 
        typeof member === 'string' ? member === receiverId : member._id === receiverId
      ) && 
      conv.members.length === 2
    );

    if (existingConversation) {
      return existingConversation;
    }

    // Nếu không có conversation, tạo mới
    const newConversation: ConversationCreateRequest = {
      members: [senderId, receiverId],
      type: 'personal'
    };

    return await addConversation(newConversation);
  } catch (error: any) {
    throw new Error(error.message || 'Failed to find or create conversation');
  }
};

// Tìm user theo username hoặc email
export const searchUser = async (query: string): Promise<IUser[]> => {
  try {
    const { data } = await baseApi.get<ApiResponse<IUser[]>>(`/users/search?q=${encodeURIComponent(query)}`);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to search users');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to search users');
  }
};

// Lấy thông tin user theo ID
export const getUserById = async (userId: string): Promise<IUser> => {
  try {
    const { data } = await baseApi.get<ApiResponse<IUser>>(`/users/${userId}`);
    if (data.success && data.data) {
      return data.data;
    }
    throw new Error(data.message || 'Failed to get user');
  } catch (error: any) {
    throw new Error(error.message || 'Failed to get user');
  }
};

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


export const getConversationOfUser = async (userId: string): Promise<IConversation[]> => {
  try {
    const { data } = await baseApi.get<any>(`/conversations/user/${userId}`);
    
    if (data.status === 200 && data.data) {
      return data.data;
    } else if (data.success && data.data) {
      return data.data;
    }
    
    throw new Error(data.message || 'Failed to fetch user conversations');
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch user conversations');
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