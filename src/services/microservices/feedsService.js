import backendApiClient from '../utils/apiClient.js';

/**
 * Create a new interest filter.
 * @param {Object} data - The interest filter data.
 * @returns {Promise<Object|null>} The created interest filter or null if an error occurs.
 */
export const createInterestFilter = async (data) => {
  try {
    const response = await backendApiClient.post('/feeds/api/v1/interestFilter', data);
    console.log(`Creating interest filter for userId: ${data.userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Get the interest filter by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object|null>} The interest filter or null if an error occurs.
 */
export const getInterestFilterByUserId = async (userId) => {
  try {
    const response = await backendApiClient.get(`/feeds/api/v1/interestFilter/${userId}`);
    console.log(`Getting interest filter for userId: ${userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Update the interest filter by user ID.
 * @param {string} userId - The ID of the user.
 * @param {Object} data - The updated interest filter data.
 * @returns {Promise<Object|null>} The updated interest filter or null if an error occurs.
 */
export const updateInterestFilterByUserId = async (userId, data) => {
  try {
    const response = await backendApiClient.put(`/feeds/api/v1/interestFilter/${userId}`, data);
    console.log(`Updating interest filter for userId: ${userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Delete the interest filter by ID.
 * @param {string} id - The ID of the interest filter.
 * @returns {Promise<Object|null>} The deleted interest filter or null if an error occurs.
 */
export const deleteInterestFilterById = async (id) => {
  try {
    const response = await backendApiClient.delete(`/feeds/api/v1/interestFilter/${id}`);
    console.log(`Deleting interest filter with id: ${id}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Create a new itineraries feed.
 * @param {Object} data - The itineraries feed data.
 * @returns {Promise<Object|null>} The created itineraries feed or null if an error occurs.
 */
export const createItinerariesFeed = async (data) => {
  try {
    const response = await backendApiClient.post('/feeds/api/v1/itinerariesFeed', data);
    console.log(`Creating itineraries feed for userId: ${data.userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Get the itineraries feed by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object|null>} The itineraries feed or null if an error occurs.
 */
export const getItinerariesFeedByUserId = async (userId) => {
  try {
    const response = await backendApiClient.get(`/feeds/api/v1/itinerariesFeed/${userId}`);
    console.log(`Getting itineraries feed for userId: ${userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
};

/**
 * Update the itineraries feed by user ID.
 * @param {string} userId - The ID of the user.
 * @param {Object} data - The updated itineraries feed data.
 * @returns {Promise<Object|null>} The updated itineraries feed or null if an error occurs.
 */
export const updateItinerariesFeedByUserId = async (userId) => {
  try {
    const response = await backendApiClient.put(`/feeds/api/v1/itinerariesFeed/${userId}`, {});
    console.log(`Updating itineraries feed for userId: ${userId}` + response);
    return response.data;
  } catch (error) {
    return null;
  }
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