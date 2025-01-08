import backendApiClient from '../utils/apiClient.js';
import userService from './userService.js';

const friendRequestService = {
  sendFriendRequest: async (recipientUserId) => {
    try {
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }

      const response = await backendApiClient.post('users/api/v1/friend-request', {
        userId: userId,
        recipientUserId: recipientUserId
      });
      return response.data;
    } catch (error) {
      console.error('Send friend request error:', error);
      throw error;
    }
  },

  getFriendRequests: async (userId) => {
    try {
      const response = await backendApiClient.get(`users/api/v1/friend-requests/${userId}`);
      
      // Get user details for each request
      const requests = await Promise.all(
        response.data.data.map(async (request) => {
          const userDetails = await userService.getUserDetails(request.userId);
          return {
            ...request,
            id: request._id,
            senderDetails: userDetails.data
          };
        })
      );

      return { data: requests };
    } catch (error) {
      console.error('Get friend requests error:', error);
      throw error;
    }
  },

  acceptFriendRequest: async (requestId) => {
    try {
      const response = await backendApiClient.put(`users/api/v1/friend-request/accept/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Accept friend request error:', error);
      throw error;
    }
  },

  rejectFriendRequest: async (requestId) => {
    try {
      const response = await backendApiClient.put(`users/api/v1/friend-request/reject/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Reject friend request error:', error);
      throw error;
    }
  }
};

export default friendRequestService;

