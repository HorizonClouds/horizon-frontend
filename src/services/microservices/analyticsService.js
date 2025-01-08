import backendApiClient from '../utils/apiClient.js';

/**
 * Get all analytics.
 * @returns {Promise<Array>} A list of analytics.
 */
export const getAllAnalytics = async () => {
  console.log('%c[getAllAnalytics] Requesting all analytics', 'color: blue;');
  const response = await backendApiClient.get('/analyticsReports/api/v1/analytics');
  console.log('%c[getAllAnalytics] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Create a new analytic.
 * @param {Object} data - The analytic data.
 * @returns {Promise<Object>} The created analytic.
 */
export const createAnalytic = async (data) => {
  console.log('%c[createAnalytic] Request data:', 'color: blue;', data);
  const response = await backendApiClient.post('/analyticsReports/api/v1/analytics', data);
  console.log('%c[createAnalytic] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Get a specific analytic by ID.
 * @param {string} analyticId - The ID of the analytic.
 * @returns {Promise<Object>} The requested analytic.
 */
export const getAnalyticById = async (analyticId) => {
  console.log('%c[getAnalyticById] Requesting analytic with ID:', 'color: blue;', analyticId);
  const response = await backendApiClient.get(`/analyticsReports/api/v1/analytics/${analyticId}`);
  console.log('%c[getAnalyticById] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Create analytics for a specific user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Object>} The created analytics.
 */
export const createAnalyticByUserId = async (userId) => {
    console.log('%c[createAnalyticByUserId] Creating analytics for user ID:', 'color: blue;', userId);
    const response = await backendApiClient.post(`/analyticsReports/api/v1/analytics/user/${userId}`);
    console.log('%c[createAnalyticByUserId] Response:', 'color: green;', response);
    return response.data?.data;
  };

/**
 * Get analytics by user ID.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of analytics for the user.
 */
const getAnalyticsByUserId = async (userId) => {
  try {
    console.log('[getAnalyticsByUserId] Requesting analytics for userId:', userId);
    // Fix the API endpoint path - remove the duplicate api/v1
    const response = await backendApiClient.get(`/analyticsReports/api/v1/analytics/user/${userId}`);
    console.log('[getAnalyticsByUserId] Response:', response);
    return response.data?.data || [];
  } catch (error) {
    console.error('[getAnalyticsByUserId] Error:', error);
    throw error;
  }
};

/**
 * Update an existing analytic by ID.
 * @param {string} analyticId - The ID of the analytic.
 * @param {Object} data - The updated analytic data.
 * @returns {Promise<Object>} The updated analytic.
 */
export const updateAnalyticById = async (analyticId, data) => {
  console.log('%c[updateAnalyticById] Updating analytic with ID:', 'color: blue;', analyticId, 'and data:', data);
  const response = await backendApiClient.put(`/analyticsReports/api/v1/analytics/${analyticId}`, data);
  console.log('%c[updateAnalyticById] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Delete an analytic by ID.
 * @param {string} analyticId - The ID of the analytic.
 * @returns {Promise<void>} No content.
 */
export const deleteAnalyticById = async (analyticId) => {
  console.log('%c[deleteAnalyticById] Deleting analytic with ID:', 'color: blue;', analyticId);
  const response = await backendApiClient.delete(`/analyticsReports/api/v1/analytics/${analyticId}`);
  console.log('%c[deleteAnalyticById] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Save or update an analytic.
 * @param {string} analyticId - The ID of the analytic (optional).
 * @param {Object} data - The analytic data to save.
 * @returns {Promise<Object>} The saved or updated analytic.
 */
export const saveAnalytic = async (analyticId, data) => {
  console.log('%c[saveAnalytic] Saving analytic with ID:', 'color: blue;', analyticId, 'and data:', data);
  const response = await backendApiClient.post(`/analyticsReports/api/v1/analytics/saveAnalytic/${analyticId || ''}`, data);
  console.log('%c[saveAnalytic] Response:', 'color: green;', response);
  return response.data?.data;
};

/**
 * Test function to verify all analytics operations.
 * @param {boolean} realUser - Whether to use a real user or mock data.
 */
async function TEST_ALL(realUser = false) {
  try {
    // Create test data
    const testAnalytic = {
      userId: "test-user-id",
      userItineraryAnalytic: {
        totalCommentsCount: 10,
        avgComments: 2.5,
        totalReviewsCount: 5,
        averageReviewScore: 4.5,
        bestItineraryByAvgReviewScore: "test-itinerary-id"
      },
      userPublicationAnalytic: {
        totalCommentsCount: 15,
        averageLike: 4.5,
        totalLikesCount: 100,
        commentsPerPublication: 5
      }
    };

    // Test create
    console.log('Testing createAnalytic...');
    const createdAnalytic = await createAnalytic(testAnalytic);
    console.log('Created Analytic:', createdAnalytic);

    // Test get all
    console.log('Testing getAllAnalytics...');
    const allAnalytics = await getAllAnalytics();
    console.log('All Analytics:', allAnalytics);

    // Test get by ID
    const analyticId = createdAnalytic._id;
    console.log('Testing getAnalyticById...');
    const analytic = await getAnalyticById(analyticId);
    console.log('Analytic by ID:', analytic);

    // Test get by user ID
    console.log('Testing getAnalyticsByUserId...');
    const userAnalytics = await getAnalyticsByUserId(testAnalytic.userId);
    console.log('Analytics by User ID:', userAnalytics);

    // Test update
    console.log('Testing updateAnalyticById...');
    const updatedData = {
      ...testAnalytic,
      userItineraryAnalytic: {
        ...testAnalytic.userItineraryAnalytic,
        totalCommentsCount: 15
      }
    };
    const updatedAnalytic = await updateAnalyticById(analyticId, updatedData);
    console.log('Updated Analytic:', updatedAnalytic);

    // Test save
    console.log('Testing saveAnalytic...');
    const savedAnalytic = await saveAnalytic(analyticId, updatedData);
    console.log('Saved Analytic:', savedAnalytic);

    // Test delete
    console.log('Testing deleteAnalyticById...');
    await deleteAnalyticById(analyticId);
    console.log('Analytic deleted successfully');

  } catch (error) {
    console.error('Error in TEST_ALL:', error);
  }
}

export default {
  getAllAnalytics,
  createAnalytic,
  getAnalyticById,
  getAnalyticsByUserId,
  updateAnalyticById,
  deleteAnalyticById,
  saveAnalytic,
  createAnalyticByUserId,
  TEST_ALL
};