import apiClient from '../../../common/services/apiClient';

export const createInterestFilter = async (data) => {
  const response = await apiClient.post('/feeds/api/v1/interestFilter', data);
  return response.data;
};

export const getInterestFilterByUserId = async (userId) => {
  const response = await apiClient.get(`/feeds/api/v1/interestFilter/${userId}`);
  return response.data;
};

export const updateInterestFilter = async (id, data) => {
  const response = await apiClient.put(`/feeds/api/v1/interestFilter/${id}`, data);
  return response.data;
};
