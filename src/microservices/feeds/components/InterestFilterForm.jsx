import React, { useState } from 'react';
import { createInterestFilter } from '../services/feedsService';
import styles from '../styles/InterestFilterForm.module.css';

const InterestFilterForm = () => {
  const [userId, setUserId] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const categories = ['NATURE', 'CITY', 'CULTURE', 'ADVENTURE', 'RELAX'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createInterestFilter({ userId, categoryList });
      alert(response.message);
    } catch (error) {
      console.error('Error creating interest filter:', error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <div>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={categoryList.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setCategoryList([...categoryList, category]);
                } else {
                  setCategoryList(categoryList.filter((c) => c !== category));
                }
              }}
            />
            {category}
          </label>
        ))}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InterestFilterForm;
