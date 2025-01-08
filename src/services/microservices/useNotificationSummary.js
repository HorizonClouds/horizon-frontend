import { useState, useEffect } from 'react'
import notificationService from './notificationService.js'
import { toast } from 'sonner'

export function useNotificationSummary(userId) {
  console.log('[useNotificationSummary] Hook initialized with userId:', userId);
  
  const [unseenCount, setUnseenCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    if (!userId) {
      console.warn('[useNotificationSummary] No userId provided');
      return;
    }

    try {
      setLoading(true);
      console.log('[useNotificationSummary] Fetching summary for userId:', userId);
      
      const response = await notificationService.getNotificationSummary(userId);
      console.log('[useNotificationSummary] Raw API response:', response);

      // Ensure we get a number
      const count = Number(response?.unseenCount || 0);
      console.log('[useNotificationSummary] Parsed unseenCount:', count);
      
      setUnseenCount(count);
    } catch (err) {
      console.error('[useNotificationSummary] Error:', err);
      setError(err);
      toast.error('Failed to load notification summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('[useNotificationSummary] Initial fetch triggered');
    fetchSummary();
    
    // Set up polling every 30 seconds
    const interval = setInterval(fetchSummary, 30000);
    return () => clearInterval(interval);
  }, [userId]);

  return {
    unseenCount,
    loading,
    error,
    refresh: fetchSummary
  };
}
