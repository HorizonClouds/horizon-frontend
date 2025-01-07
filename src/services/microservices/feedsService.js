import backendApiClient from '../utils/apiClient.js';

export const createInterestFilter = async (data) => {
  try {
    const response = await backendApiClient.post('/feeds/api/v1/interestFilter', data);
    console.log(response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const getInterestFilterByUserId = async (userId) => {
  const response = await backendApiClient.get(`/feeds/api/v1/interestFilter/${userId}`);
  return response.data;
};

export const updateInterestFilterByUserId = async (userId, data) => {
  const response = await backendApiClient.put(`/feeds/api/v1/interestFilter/${userId}`, data);
  return response.data;
};

export const deleteInterestFilterById = async (id) => {
  const response = await backendApiClient.delete(`/feeds/api/v1/interestFilter/${id}`);
  return response.data;
};

export const createItinerariesFeed = async (data) => {
  try {
    const response = await backendApiClient.post('/feeds/api/v1/itinerariesFeed', data);
    console.log(response)
    return response.data;
  } catch (error) {
    return null
  }
  
};

export const getItinerariesFeedByUserId = async (userId) => {
  const response = await backendApiClient.get(`/feeds/api/v1/itinerariesFeed/${userId}`);
  return response.data;
};

export const updateItinerariesFeedByUserId = async (userId, data) => {
  const response = await backendApiClient.put(`/feeds/api/v1/itinerariesFeed/${userId}`);
  return response.data;
};

export default {
  createInterestFilter,
  getInterestFilterByUserId,
  updateInterestFilterByUserId,
  deleteInterestFilterById,
  createItinerariesFeed,
  getItinerariesFeedByUserId,
  updateItinerariesFeedByUserId
};