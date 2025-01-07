import backendApiClient from '../utils/apiClient.js';
import userService from './userService.js'

const followingService = {
  followUser: async (followerUserId, followedUserId) => {
    try {
      const response = await backendApiClient.post('users/api/v1/follow', {
        followerUserId,
        followedUserId
      });
      return response.data;
    } catch (error) {
      console.error('Follow user error:', error);
      throw error;
    }
  },

  getFriends: async (userId) => {
    try {
      const response = await backendApiClient.get(`users/api/v1/followers/${userId}`);
      
      // Get user details for each friend
      const friendsDetails = await Promise.all(
        response.data.data.map(async (friendId) => {
          const userDetails = await userService.getUserDetails(friendId);
          return userDetails.data;
        })
      );

      return { data: friendsDetails };
    } catch (error) {
      console.error('Get friends error:', error);
      throw error;
    }
  }
};

export default followingService;

