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
    const response = await backendApiClient.put(`/chats/api/v1/message/messageStatus/${id}`);
    console.log(`Updating message with id ${id}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const deleteMessageById = async (id) => {
  try {
    const response = await backendApiClient.delete(`/chats/api/v1/message/${id}`);
    console.log(`Deleting message with id ${id}` + response)
    return response.data;
  } catch (error) {
    return null
  }
};

export const getChatBetweenUsersByWriterUserIdAndReceiverUserId = async (writerUserId, receiverUserId) => {
    const response = await backendApiClient.get(`/chats/api/v1/chat/${writerUserId}/${receiverUserId}`);
    console.log(`Getting chat between writerUserId: ${writerUserId} and receiverUserId: ${receiverUserId}`, response.data?.data);
    
    return response.data?.data;
};

export default {
  createMessage,
  updateMessageStatusById,
  deleteMessageById,
  getChatBetweenUsersByWriterUserIdAndReceiverUserId,
};