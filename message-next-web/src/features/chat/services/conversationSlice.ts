import {
    createSlice,
    createAsyncThunk,
    PayloadAction,
  } from "@reduxjs/toolkit";
  import { 
    IConversation, 
    ConversationCreateRequest, 
    ConversationUpdateRequest 
  } from "@/types/types";
import { 
  addConversation, 
  getConversationOfUser, 
  getAllConversations,
  updateConversation,
  deleteConversation,
  addMemberToConversation,
  getConversationBetweenUsers
} from "@/apis/conservationApi";
  
  interface ConversationState {
    list: IConversation[];
    selectedId?: string;
    loading: boolean;
    error?: string;
  }
  
  const initialState: ConversationState = {
    list: [],
    loading: false,
  };
  
  export const fetchConversations = createAsyncThunk(
    "conversations/fetchAll",
    async (userId: string, { rejectWithValue }) => {
      try {
        const data = await getConversationOfUser(userId);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const fetchAllConversations = createAsyncThunk(
    "conversations/fetchAllAdmin",
    async (_, { rejectWithValue }) => {
      try {
        const data = await getAllConversations();
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const fetchConversationBetweenUsers = createAsyncThunk(
    "conversations/fetchBetweenUsers",
    async ({ userId1, userId2 }: { userId1: string; userId2: string }, { rejectWithValue }) => {
      try {
        const data = await getConversationBetweenUsers(userId1, userId2);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  // Thunk: thêm hội thoại
  export const createConversation = createAsyncThunk(
    "conversations/create",
    async (conversation: ConversationCreateRequest, { rejectWithValue }) => {
      try {
        const data = await addConversation(conversation);
        return data;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const updateConversationAction = createAsyncThunk(
    "conversations/update",
    async ({ conversationId, updates }: { conversationId: string; updates: ConversationUpdateRequest }, { rejectWithValue }) => {
      try {
        const data = await updateConversation(conversationId, updates);
        return { conversationId, data };
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const deleteConversationAction = createAsyncThunk(
    "conversations/delete",
    async (conversationId: string, { rejectWithValue }) => {
      try {
        await deleteConversation(conversationId);
        return conversationId;
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );

  export const addMemberToConversationAction = createAsyncThunk(
    "conversations/addMember",
    async ({ conversationId, userId }: { conversationId: string; userId: string }, { rejectWithValue }) => {
      try {
        const data = await addMemberToConversation(conversationId, userId);
        return { conversationId, data };
      } catch (err: any) {
        return rejectWithValue(err.message);
      }
    }
  );
  
  const conversationSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
      selectConversation: (state, action: PayloadAction<string>) => {
        state.selectedId = action.payload;
      },
      updateLastMessage: (
        state,
        action: PayloadAction<{ conversationId: string; message: string }>
      ) => {
        const conv = state.list.find(c => c._id === action.payload.conversationId);
        if (conv) {
          conv.lastMessage = action.payload.message as any;
          conv.lastUpdated = new Date();
        }
        state.list.sort(
          (a, b) =>
            new Date(b.lastUpdated).getTime() -
            new Date(a.lastUpdated).getTime()
        );
      },
    },
    extraReducers: builder => {
      builder
        .addCase(fetchConversations.pending, state => {
          state.loading = true;
          state.error = undefined;
        })
        .addCase(fetchConversations.fulfilled, (state, action) => {
          state.loading = false;
          state.list = action.payload;
        })
        .addCase(fetchConversations.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        .addCase(fetchAllConversations.fulfilled, (state, action) => {
          state.list = action.payload;
        })
        .addCase(fetchConversationBetweenUsers.fulfilled, (state, action) => {
          // If conversation exists, update it; otherwise add it to the list
          const existingIndex = state.list.findIndex(c => c._id === action.payload._id);
          if (existingIndex >= 0) {
            state.list[existingIndex] = action.payload;
          } else {
            state.list.unshift(action.payload);
          }
        })
        .addCase(createConversation.fulfilled, (state, action) => {
          state.list.unshift(action.payload);
        })
        .addCase(updateConversationAction.fulfilled, (state, action) => {
          const index = state.list.findIndex(c => c._id === action.payload.conversationId);
          if (index >= 0) {
            state.list[index] = { ...state.list[index], ...action.payload.data };
          }
        })
        .addCase(deleteConversationAction.fulfilled, (state, action) => {
          state.list = state.list.filter(c => c._id !== action.payload);
          if (state.selectedId === action.payload) {
            state.selectedId = undefined;
          }
        })
        .addCase(addMemberToConversationAction.fulfilled, (state, action) => {
          const index = state.list.findIndex(c => c._id === action.payload.conversationId);
          if (index >= 0) {
            state.list[index] = action.payload.data;
          }
        });
    },
  });
  
  export const { selectConversation, updateLastMessage } =
    conversationSlice.actions;
  
  export default conversationSlice.reducer;
  