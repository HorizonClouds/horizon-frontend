import backendApiClient from '../utils/apiClient.js';

const passwordRecoveryService = {
  changePassword: async (currentPassword, newPassword) => {
    try {
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }

      const response = await backendApiClient.put('users/api/v1/password/change', {
        userId,
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }
};

export default passwordRecoveryService;
