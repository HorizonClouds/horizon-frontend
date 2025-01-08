import backendApiClient from '../utils/apiClient.js';
import usersService from './usersService.js';

/**
 * Create a new analytic.
 * @param {Object} data - The analytic data.
 * @returns {Promise<Object>} The created analytic.
 */
export const createReport = async (reportData) => {
  console.log('%c[createReport] Creating report:', 'color: blue;', reportData);
  const response = await backendApiClient.post('/analyticsReports/api/v1/reports', reportData);
  console.log('%c[createReport] Response:', 'color: green;', response);
  return response.data?.data;
};

async function TEST_ALL(realUser = false) {
  
  const user = usersService.getLoggedUser()?.id;
  // Create a new report
  const newReport = {
    userId: user,
    type: "itinerary",
    resourceId: "64b7d23f72c9fda7d1f8a3b3",
    reason: "Inappropriate content"
  };

  // Test create report
  const createdReport = await createReport(newReport);
  console.log('Created Report:', createdReport);
}
export default {
  createReport,
  TEST_ALL
};
