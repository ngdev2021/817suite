import axiosInstance from './axiosInstance';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      '/users/register',
      userData
    );
    // Optional: Save tokens if returned during registration
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    if (response.data.refreshToken) {
      localStorage.setItem(
        'refreshToken',
        response.data.refreshToken
      );
    }
    return response.data;
  } catch (error) {
    console.error(
      'Error registering user:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Failed to register user'
    );
  }
};

// Login User
export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post(
      '/users/login',
      loginData
    );
    // Save tokens to localStorage or sessionStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error(
      'Error logging in user:',
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || 'Failed to log in user'
    );
  }
};
