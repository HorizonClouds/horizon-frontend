import backendApiClient from '../utils/apiClient.js';

export const login = async (credentials) => {
  const response = await backendApiClient.post('/users/api/v1/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await backendApiClient.post('/users/api/v1/register', userData);
  return response.data;
};

export const getUserProfile = async (userId) => {
  const response = await backendApiClient.get(`/users/api/v1/profile/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, userData) => {
  const response = await backendApiClient.put(`/users/api/v1/profile/${userId}`, userData);
  return response.data;
};

export default {
  login,
  register,
  getUserProfile,
  updateUserProfile
};