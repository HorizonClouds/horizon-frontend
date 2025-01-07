import backendApiClient from '../utils/apiClient.js';

export const requestPasswordRecovery = async (email) => {
  const response = await backendApiClient.post('/password/api/v1/recovery-request', { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await backendApiClient.post('/password/api/v1/reset-password', { token, newPassword });
  return response.data;
};

export default {
  requestPasswordRecovery,
  resetPassword
};