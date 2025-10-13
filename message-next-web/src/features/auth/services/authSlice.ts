import { LoginAPI, registerAPI } from "@/apis/authApi";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { IUser } from "@/types/types";

interface AuthState  { 
user :IUser | null   
token : string | null
isAuthenticated : boolean
isLoading : boolean
error : string | null
registrationSuccess : boolean
}

// Helper function to safely get data from localStorage
const getLocalStorageData = () => {
  if (typeof window !== 'undefined') {
    try {
      const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false')
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
      const token = localStorage.getItem('token')
      
      console.log('Loading from localStorage:', {
        isAuthenticated,
        
        currentUser,
        token
      });
      
      return { isAuthenticated, currentUser, token }
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return { isAuthenticated: false, currentUser: null, token: null }
    }
  }
  return { isAuthenticated: false, currentUser: null, token: null }
}

const { isAuthenticated, currentUser, token } = getLocalStorageData()

const initialState : AuthState =  { 
    user : currentUser,
    token : token,
    isAuthenticated: isAuthenticated && !!currentUser && !!token, 
    isLoading : false,
    error : null,
    registrationSuccess : false
}
export const login = createAsyncThunk(
    'auth/login',
    async ({ phone, email, password }: { phone?: string; email?: string; password: string }, { rejectWithValue }) => {
      try {
        // Validate input
        if ((!phone && !email) || !password) {
          return rejectWithValue('Vui lòng nhập đầy đủ thông tin đăng nhập');
        }
        
        const loginData = phone ? { phone, password } : { email, password };
        const response = await LoginAPI(loginData);
        return response;
      } catch (error: unknown) {
        // Handle different types of errors
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const err = error as { response?: { status?: number } };
          if (err.response?.status === 401) {
            return rejectWithValue('Số điện thoại/email hoặc mật khẩu không đúng');
          } else if (err.response?.status === 404) {
            return rejectWithValue('Tài khoản không tồn tại');
          } else if ((err.response?.status ?? 0) >= 500) {
            return rejectWithValue('Lỗi server, vui lòng thử lại sau');
          }
        }
        const message = (typeof error === 'object' && error !== null && 'message' in error)
          ? String((error as { message?: string }).message)
          : 'Đăng nhập thất bại';
        return rejectWithValue(message);
      }
    },
  );
  export const register = createAsyncThunk('auth/register',async ({email,username, password, phone}: IUser, { rejectWithValue })=> {
    try {   
        const response = await registerAPI({email,username, password, phone})
        return response
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'response' in error) {
          const message = (error as { response?: { data?: { message?: string } } }).response?.data?.message
          return rejectWithValue(message || 'Đăng ký thất bại')
        }
        const message = (typeof error === 'object' && error !== null && 'message' in error)
          ? String((error as { message?: string }).message)
          : 'Đăng ký thất bại'
        return rejectWithValue(message)
    }
  })    
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isAuthenticated');
        window.location.reload();
      },
      setCredentials: (state, action: PayloadAction<{ user: IUser; token: string }>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      },
      clearError: (state) => {
        state.error = null;
      },
      resetRegistrationSuccess: (state) => {
        state.registrationSuccess = false;
      },
    },
    extraReducers: (builder) => {
      // Login cases
      builder
        .addCase(login.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('Login Response:', action.payload);
            console.log('Response structure:', JSON.stringify(action.payload, null, 2));
          
          state.isLoading = false;
          state.error = null;
          
          if (action.payload) {
            // Chuẩn hóa response để tương thích nhiều cấu trúc trả về khác nhau
            const payload: any = action.payload as any;
            const userData = payload?.user
              ?? payload?.data?.user
              ?? payload?.data?.userInfo
              ?? payload?.currentUser
              ?? payload?.data?.currentUser
              ?? payload?.userData
              ?? null;
            const token = payload?.accessToken
              ?? payload?.token
              ?? payload?.data?.accessToken
              ?? payload?.data?.token
              ?? payload?.jwt
              ?? null;
            
            console.log('Resolved user:', userData);
            console.log('Resolved token:', token);
            
            if (userData && token) {
              state.user = userData;
              state.token = token;
              state.isAuthenticated = true;
      
              // Lưu thông tin user vào localStorage với đầy đủ thông tin
              const userDataToSave = {
                ...userData,
                id: userData._id || userData.id,
              };
              console.log('Saving user data to localStorage:', userDataToSave);
      
              localStorage.setItem('currentUser', JSON.stringify(userDataToSave));
              localStorage.setItem('token', token);
              localStorage.setItem('isAuthenticated', 'true');
              
              console.log('Data saved to localStorage successfully');
            } else {
              console.error('Missing user data or token in response');
              state.error = 'Dữ liệu người dùng không hợp lệ';
              state.isAuthenticated = false;
            }
          } else {
            console.error('No payload in response');
            state.error = 'Đăng nhập thất bại';
            state.isAuthenticated = false;
          }
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.error = (action.payload as string) || action.error.message || 'Đăng nhập thất bại';
          state.isAuthenticated = false;
          
          // Xóa thông tin cũ trong localStorage khi login thất bại
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          localStorage.removeItem('isAuthenticated');
          
          console.log('Login failed:', action.payload);
        });
  
      // Register cases
      builder
        .addCase(register.pending, (state) => {
          state.isLoading = true;
          state.error = null;
          state.registrationSuccess = false;
        })
        .addCase(register.fulfilled, (state) => {
          state.isLoading = false;
          state.error = null;
          state.registrationSuccess = true;
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.error = (action.payload as string) || action.error.message || 'Đăng ký thất bại';
          state.registrationSuccess = false;
        });
    },
  });
  
  export const { logout, setCredentials, clearError, resetRegistrationSuccess } = authSlice.actions;
  export default authSlice.reducer;
  export const selectAuth = (state: RootState) => state.auth;
  