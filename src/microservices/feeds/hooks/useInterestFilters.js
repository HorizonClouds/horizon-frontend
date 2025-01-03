import { useState, useEffect } from 'react';
import { getInterestFilterByUserId } from '../services/feedsService';

const useInterestFilters = (userId) => {
  const [filters, setFilters] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const data = await getInterestFilterByUserId(userId);
        setFilters(data);
      } catch (error) {
        console.error('Error fetching interest filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [userId]);

  return { filters, loading };
};

export default useInterestFilters;
