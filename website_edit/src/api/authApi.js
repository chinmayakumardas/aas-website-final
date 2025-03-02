
import axiosInstance from '@/utils/axiosInstance';

// Register API call
export const registerApi = async (username, email, password, role,firstName,lastName,bio) => {
  try {
    const response = await axiosInstance.post('/register', { username, email, password, role,firstName,lastName,bio });
    console.log('Register API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Register API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Registration failed');
  }
};

// Login API call
export const loginApi = async (email, password) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    console.log('Login API Response:', response);
    //return { token: response.data.token, role: response.data.role };
    return response;
  } catch (error) {
    console.error('Login API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Login failed');
  }
};

// Send OTP API call
export const sendOtpApi = async (email) => {
  try {
    const response = await axiosInstance.post('/forgot-password', { email });
    console.log('Send OTP API Response:', response);
    return response.data.message;
  } catch (error) {
    console.error('Send OTP API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Failed to send OTP');
  }
};

// Verify OTP API call
export const verifyOtpApi = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/verify-otp', { email, otp });
    console.log('Verify OTP API Response:', response);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('role', response.data.role);
    return { message: response.data.message, token: response.data.token, refreshToken: response.data.refreshToken, role: response.data.role, email: response.data.email };
  } catch (error) {
    console.error('Verify OTP API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Invalid OTP');
  }
};

// Reset Password API call
export const resetPasswordApi = async (email, otp, newPassword) => {
  try {
    const response = await axiosInstance.post('/reset-password', { email, otp, newPassword });
    console.log('Reset Password API Response:', response);
    return response.data.message;
  } catch (error) {
    console.error('Reset Password API Error:', error.message);
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

    console.log('Edit Profile API Response:', response);
    return response.data;
  } catch (error) {
    console.error('Edit Profile API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Failed to update profile');
  }
};

// Get All Users API call
export const getAllUsersApi = async () => {
  try {
    const response = await axiosInstance.get('/users');
    //console.log('Get All Users API Response:', response);
    return response.data || []; // Ensure users are fetched correctly
  } catch (error) {
    console.error('Get All Users API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch users');
  }
};
// Get  Users API call
export const getUserDataApi = async (email) => {
  try {
 const response = await axiosInstance.get(`/userdetails/${email}`);
    //console.log('Get user details API Response:', response);
    return response.data; // Ensure users are fetched correctly
  } catch (error) {
    //console.error('Get user details API Error:', error.message);
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user details');
  }
};
