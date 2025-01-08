import backendApiClient from '../utils/apiClient.js';
import usersService from './usersService.js';

/**
 * Get all notifications.
 * @returns {Promise<Array>} A list of notifications.
 */
export const getAllNotifications = async () => {
    console.log('%c[getAllNotifications] Requesting all notifications', 'color: blue;');
    const response = await backendApiClient.get('/notifications/api/v1/notifications');
    console.log('%c[getAllNotifications] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Get a specific notification by ID.
 * @param {string} notificationId - The ID of the notification.
 * @returns {Promise<Object>} The requested notification.
 */
export const getNotificationById = async (notificationId) => {
    console.log('%c[getNotificationById] Requesting notification with ID:', 'color: blue;', notificationId);
    const response = await backendApiClient.get(`/notifications/api/v1/notifications/${notificationId}`);
    console.log('%c[getNotificationById] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Create a new notification.
 * @param {Object} data - The notification data.
 * @returns {Promise<Object>} The created notification.
 */
export const createNotification = async (data) => {
    console.log('%c[createNotification] Request data:', 'color: blue;', data);
    const response = await backendApiClient.post('/notifications/api/v1/notifications', data);
    console.log('%c[createNotification] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Update a notification by ID.
 * @param {string} notificationId - The ID of the notification.
 * @param {Object} data - The updated notification data.
 * @returns {Promise<Object>} The updated notification.
 */
export const updateNotification = async (notificationId, data) => {
    console.log('%c[updateNotification] Updating notification with ID:', 'color: blue;', notificationId, 'and data:', data);
    const response = await backendApiClient.put(`/notifications/api/v1/notifications/${notificationId}`, data);
    console.log('%c[updateNotification] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Delete a notification by ID.
 * @param {string} notificationId - The ID of the notification.
 * @returns {Promise<void>} No content.
 */
export const deleteNotification = async (notificationId) => {
    console.log('%c[deleteNotification] Deleting notification with ID:', 'color: blue;', notificationId);
    const response = await backendApiClient.delete(`/notifications/api/v1/notifications/${notificationId}`);
    console.log('%c[deleteNotification] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Mark a notification as seen.
 * @param {string} notificationId - The ID of the notification.
 * @returns {Promise<Object>} The updated notification.
 */
export const markNotificationAsSeen = async (notificationId) => {
    console.log('%c[markNotificationAsSeen] Marking notification as seen with ID:', 'color: blue;', notificationId);
    const response = await backendApiClient.put(`/notifications/api/v1/notifications/${notificationId}`, {
        notificationStatus: 'SEEN'
    });
    console.log('%c[markNotificationAsSeen] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Get all notifications for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of notifications.
 */
export const getNotificationsByUserId = async (userId) => {
    console.log('%c[getNotificationsByUserId] Requesting notifications for user ID:', 'color: blue;', userId);
    const response = await backendApiClient.get(`/notifications/api/v1/notifications?userId=${userId}`);
    console.log('%c[getNotificationsByUserId] Response:', 'color: green;', response);
    return response.data?.data;
};

/**
 * Get all notifications for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} A list of notifications.
 */
const getNotificationSummary = async (userId) => {
    try {
      console.log('[getNotificationSummary] Starting request for userId:', userId);
  
      if (!userId) {
        console.error('[getNotificationSummary] No userId provided');
        return { unseenCount: 0 };
      }
  
      const response = await backendApiClient.get(`/notifications/api/v1/notifications/userSummary/${userId}`);
      
      console.log('[getNotificationSummary] Full API response:', response);
  
      if (!response.data) {
        console.warn('[getNotificationSummary] No data in response');
        return { unseenCount: 0 };
      }
  
      // Try to get the data from different possible response structures
      const data = response.data.data || response.data;
      console.log('[getNotificationSummary] Extracted data:', data);
  
      // Convert to number and validate
      const unseenCount = Number(data.unseenCount || data.unseen_count || 0);
      console.log('[getNotificationSummary] Parsed unseenCount:', unseenCount);
  
      if (isNaN(unseenCount)) {
        console.warn('[getNotificationSummary] Invalid unseenCount value');
        return { unseenCount: 0 };
      }
  
      return { unseenCount };
    } catch (error) {
      console.error('[getNotificationSummary] Error:', error);
      return { unseenCount: 0 };
    }
  };
/**
 * Update email notification settings for a user.
 * @param {string} notificationId - The ID of the notification.
 * @param {boolean} emailEnabled - Whether email notifications should be enabled.
 * @returns {Promise<Object>} The updated notification.
 */
export const updateEmailSettings = async (notificationId, emailEnabled) => {
    console.log('%c[updateEmailSettings] Updating email settings for notification ID:', 'color: blue;', notificationId);
    const response = await backendApiClient.put(`/notifications/api/v1/notifications/${notificationId}`, {
        config: { email: emailEnabled }
    });
    console.log('%c[updateEmailSettings] Response:', 'color: green;', response);
    return response.data?.data;
};

async function TEST_ALL(realUser = false) {
    const user = usersService.getLoggedUser()?.id;
    // Create a new notification
    const newNotification = {
        userId: user,
        config: {
            email: true
        },
        type: "itinerary",
        resourceId: "64b7d23f72c9fda7d1f8a3b3",
        notificationStatus: "NOT SEEN"
    };

    // Test create notification
    const createdNotification = await createNotification(newNotification);
    console.log('Created Notification:', createdNotification);

    // Test get all notifications
    const allNotifications = await getAllNotifications();
    console.log('All Notifications:', allNotifications);

    // Test get notification by ID
    const notificationId = createdNotification._id;
    const notification = await getNotificationById(notificationId);
    console.log('Notification by ID:', notification);

    // Test get notifications by user ID
    const userNotifications = await getNotificationsByUserId(newNotification.userId);
    console.log('User Notifications:', userNotifications);

    // Test get notifications by user ID
    const userNotificationsSummary = await getNotificationSummary(newNotification.userId);
    console.log('User Notifications:', userNotificationsSummary);
    // Test mark notification as seen
    const seenNotification = await markNotificationAsSeen(notificationId);
    console.log('Seen Notification:', seenNotification);

    // Test update email settings
    const updatedEmailSettings = await updateEmailSettings(notificationId, false);
    console.log('Updated Email Settings:', updatedEmailSettings);

    // Test delete notification
    await deleteNotification(notificationId);
    console.log('Notification deleted successfully');
}

export default {
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    markNotificationAsSeen,
    getNotificationsByUserId,
    updateEmailSettings,
    getNotificationSummary,
    TEST_ALL,
};