import apiClient from '../../../common/services/apiClient';

export const createInterestFilter = async (data) => {
  const response = await apiClient.post('/interestFilter', data);
  return response.data;
};

export const getInterestFilterByUserId = async (userId) => {
  const response = await apiClient.get(`/interestFilter/${userId}`);
  return response.data;
};

export const updateInterestFilter = async (id, data) => {
  const response = await apiClient.put(`/interestFilter/${id}`, data);
  return response.data;
};
