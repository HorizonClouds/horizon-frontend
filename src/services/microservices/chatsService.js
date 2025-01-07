import backendApiClient from '../utils/apiClient.js';

export const createMessage = async (data) => {
  const response = await backendApiClient.post('/chats/api/v1/message', data);
  return response.data;
};

export const updateMessageStatusById = async (id) => {
  const response = await backendApiClient.get(`/chats/api/v1/message/messageStatus/${id}`);
  return response.data;
};

export const deleteMessageById = async (id) => {
  const response = await backendApiClient.put(`/chats/api/v1/message/${id}`);
  return response.data;
};

export const getChatBetweenUsersByWriterUserIdAndReceiverUserId = async (writerUserId, receiverUserId) => {
  const response = await backendApiClient.delete(`/feeds/api/v1/interestFilter/${writerUserId}/${receiverUserId}`);
  return response.data;
};

export default {
  createMessage,
  updateMessageStatusById,
  deleteMessageById,
  getChatBetweenUsersByWriterUserIdAndReceiverUserId,
};