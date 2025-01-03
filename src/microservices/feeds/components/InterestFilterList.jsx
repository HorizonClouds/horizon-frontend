import React from 'react';
import useInterestFilters from '../hooks/useInterestFilters';

const InterestFilterList = ({ userId }) => {
  const { filters, loading } = useInterestFilters(userId);

  if (loading) return <p>Loading...</p>;
  if (!filters) return <p>No filters found.</p>;

  return (
    <div>
      <h2>Interest Filters for User {userId}</h2>
      <ul>
        {filters.categoryList.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

export default InterestFilterList;
