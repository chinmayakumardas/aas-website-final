import Cookies from "js-cookie";
import axiosInstance from '@/utils/axiosInstance';

// Register API call
export const registerApi = async (username, email, password, role,firstName,lastName,bio) => {
  try {
    const response = await axiosInstance.post('/register', { username, email, password, role,firstName,lastName,bio });

    return response.data;
  } catch (error) {

    throw new Error(error.response ? error.response.data.message : 'Registration failed');
  }
};

// Login API call
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    
    return response;
  } catch (error) {
      
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};

// Send OTP API call
export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post('/forgot-password', { email });
 
    return response.data.message;
  } catch (error) {
  
    throw new Error(error.response ? error.response.data.message : 'Failed to send OTP');
  }
};



export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/verify-otp", { email, otp });


    // Store authentication details in cookies
    Cookies.set("token", response.data.token, {
      expires: 7, // Token expires in 7 days
      secure: true, // HTTPS only
      sameSite: "Strict",
      path: "/",
    });

    Cookies.set("refreshToken", response.data.refreshToken, {
      expires: 30, // Refresh token expires in 30 days
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    Cookies.set("email", response.data.email, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    Cookies.set("role", response.data.role, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
      path: "/",
    });

    return {
      message: response.data.message,
      token: response.data.token,
      refreshToken: response.data.refreshToken,
      role: response.data.role,
      email: response.data.email,
    };
  } catch (error) {
 
    throw new Error(error.response ? error.response.data.message : "Invalid OTP");
  }
};

// Reset Password API call
export const resetPasswordApi = async (email, otp, newPassword) => {
  try {
    const response = await axiosInstance.post('/reset-password', { email, otp, newPassword });
   
    return response.data.message;
  } catch (error) {
 
    throw new Error(error.response ? error.response.data.message : 'Failed to reset password');
  }
};


// Edit Profile API call
export const editProfileApi = async (firstName, lastName,email, bio, role) => {
  try {
   
    // Include the Bearer token in the Authorization header
    const response = await axiosInstance.put(
      '/edit-profile',
      { firstName, lastName, bio,email, role }
    );


    return response.data;
  } catch (error) {
  
    throw new Error(error.response ? error.response.data.message : 'Failed to update profile');
  }
};

// Get All Users API call
export const getAllUsersApi = async () => {
  try {
    const response = await axiosInstance.get('/users');
  
    return response.data || []; // Ensure users are fetched correctly
  } catch (error) {

    throw new Error(error.response ? error.response.data.message : 'Failed to fetch users');
  }
};
// Get  Users API call
export const getUserDataApi = async (email) => {
  try {
 const response = await axiosInstance.get(`/userdetails/${email}`);

    return response.data; // Ensure users are fetched correctly
  } catch (error) {
   
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user details');
  }
};
// Get  delete API call
export const deleteUserApi = async (email) => {
  try {
 const response = await axiosInstance.delete(`/deleteuser/${email}`);
    
    return response; // Ensure users are fetched correctly
  } catch (error) {

    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user details');
  }
};
