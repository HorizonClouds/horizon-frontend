import backendApiClient from '../utils/apiClient.js';

export const followUser = async (followerId, followedId) => {
  const response = await backendApiClient.post('/following/api/v1', { followerId, followedId });
  return response.data;
};

export const unfollowUser = async (followerId, followedId) => {
  const response = await backendApiClient.delete(`/following/api/v1/${followerId}/${followedId}`);
  return response.data;
};

export const getFollowers = async (userId) => {
  const response = await backendApiClient.get(`/following/api/v1/followers/${userId}`);
  return response.data;
};

export const getFollowing = async (userId) => {
  const response = await backendApiClient.get(`/following/api/v1/following/${userId}`);
  return response.data;
};

export default {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
};