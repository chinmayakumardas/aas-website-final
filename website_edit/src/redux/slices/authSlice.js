

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerApi,
  loginApi,
  sendOtpApi,
  verifyOtpApi,
  resetPasswordApi,
  editProfileApi,
  getAllUsersApi,getUserDataApi,deleteUserApi
} from '@/api/authApi';  // Import your API calls
 
// Async Thunks for API Calls
 
//register
 export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password, role,firstName,lastName,bio }, { rejectWithValue }) => {
    try {
      const response = await registerApi(username, email, password, role,firstName,lastName,bio);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (email, { rejectWithValue }) => {
    try {
      const message = await sendOtpApi(email);
      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await verifyOtpApi(email, otp);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    try {
      const message = await resetPasswordApi(email, otp, newPassword);
      return message;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 
export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async ({ firstName, lastName,email, bio, role }, { rejectWithValue }) => {
    try {
      const user = await editProfileApi(firstName, lastName, email, bio, role); // Removed password
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


 export const getAllUsers = createAsyncThunk(
  'auth/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getAllUsersApi();
      //console.log(users)
      return users; // Return the array of users directly
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (email, { rejectWithValue }) => {
    try {
      const userData = await getUserDataApi(email);
      //console.log(userData)
      return userData; // Return the array of users directly
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
 export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (email, { rejectWithValue }) => {
    try {
      const response = await deleteUserApi(email);
     
      return response; // 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// Initial State
const initialState = {
  user: null,
  userDetails:[],
  token: null,
  refreshToken: null,
  role: null,
  email:null,
  loading: false,
  error: null,
  message: null,
  users: [],  // Ensure this is an array to store users
  status: 'idle'
};
 
// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.email=null,
      state.error = null;
      state.message = null;
     
      
     
  
    },
    },
 
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.message = 'Login successful';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.message = action.payload.message;
      
    
    
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Edit Profile
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        //state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        //state.message = 'Profile updated successfully';
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Edit Profile
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
     //Get All Users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;  // Ensure we have an array here
        
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

     //Get userDetails 
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = action.payload;  // Ensure we have an array here
        
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
 
// Export Actions and Reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;