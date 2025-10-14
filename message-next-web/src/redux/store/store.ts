import { configureStore } from '@reduxjs/toolkit'; 
import authReducer from '../slices/authSlice'; 
import chatReducer from '../slices/chatSlice'
import conversationReducer from '../slices/conversationSlice'
import socketReducer from '../slices/socketSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    conversation: conversationReducer,
    socket: socketReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['socket/setSocket'],
        ignoredPaths: ['socket.socket']
      }
    })
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
