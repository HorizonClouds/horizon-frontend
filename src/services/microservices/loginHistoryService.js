import backendApiClient from '../utils/apiClient.js';

export const getLoginHistory = async (userId) => {
  const response = await backendApiClient.get(`/login-history/api/v1/${userId}`);
  return response.data;
};

export const addLoginEntry = async (userId) => {
  const response = await backendApiClient.post('/login-history/api/v1', { userId });
  return response.data;
};

export default {
  getLoginHistory,
  addLoginEntry
};