import backendApiClient from '../utils/apiClient.js';

export const createMessage = async (data) => {
  try {
    const response = await backendApiClient.post('/chats/api/v1/message', data);
    console.log(`Creating message betweem writerUserId: ${data.writerUserId} and receiverUserId: ${data.receiverUserId}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const updateMessageStatusById = async (id) => {
  try {
    const response = await backendApiClient.get(`/chats/api/v1/message/messageStatus/${id}`);
    console.log(`Updating message with id ${id}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const deleteMessageById = async (id) => {
  try {
    const response = await backendApiClient.put(`/chats/api/v1/message/${id}`);
    console.log(`Deleting message with id ${id}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const getChatBetweenUsersByWriterUserIdAndReceiverUserId = async (writerUserId, receiverUserId) => {
  try {
    const response = await backendApiClient.delete(`/feeds/api/v1/interestFilter/${writerUserId}/${receiverUserId}`);
    console.log(`Getting chat betweem writerUserId: ${data.writerUserId} and receiverUserId: ${data.receiverUserId}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export default {
  createMessage,
  updateMessageStatusById,
  deleteMessageById,
  getChatBetweenUsersByWriterUserIdAndReceiverUserId,
};