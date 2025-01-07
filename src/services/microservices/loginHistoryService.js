import backendApiClient from '../utils/apiClient.js';

const loginHistory = {
    getLoginHistory: async (userId) => {
      try {
        const response = await backendApiClient.get(`users/api/v1/loginHistory/${userId}`);
        // Asegurarnos de devolver el array de historiales o convertir el objeto único en array
        return {
          data: Array.isArray(response.data.data) ? response.data.data : [response.data.data]
        };
      } catch (error) {
        console.error('Get login history error:', error);
        throw error;
      }
    }
};

export default loginHistory;