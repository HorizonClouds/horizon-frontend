import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from 'react-router-dom';  // Para acceder a los parámetros de la URL
import { getInterestFilterByUserId, updateInterestFilterByUserId } from '@/services/microservices/feedsService';

const InterestFilterFormView = () => {
  const { userId } = useParams();  // Obtener el userId desde la URL
  const [interestFilter, setInterestFilter] = useState({
    userId: '',
    categoryList: []  // Inicializar categoryList como un arreglo vacío
  });

  useEffect(() => {
    const fetchInterestFilter = async () => {
      const data = await getInterestFilterByUserId(userId);
      if (data) {
        setInterestFilter({
          userId: data.userId,
          categoryList: Array.isArray(data.categoryList) ? data.categoryList : [] 
        });
      }
    };
    if (userId) {
      fetchInterestFilter();
    }
  }, [userId]);

  const handleCategoryChange = (category) => {
    setInterestFilter((prev) => {
      const categoryList = prev.categoryList.includes(category)
        ? prev.categoryList.filter((item) => item !== category)  // Si la categoría ya está seleccionada, se elimina
        : [...prev.categoryList, category];  // Si no está seleccionada, se agrega
      return { ...prev, categoryList };
    });
  };
  
  const handleSubmit = async () => {
    await updateInterestFilterByUserId(userId, interestFilter);
  };

  const categories = ['NATURE', 'CITY', 'CULTURE', 'ADVENTURE', 'RELAX'];

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Interest Filter</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="User ID"
          value={userId}  // El userId se toma desde la URL
          readOnly
          className="mb-2"
        />
        <div className="mb-2">
          {categories.map((category) => (
            <label key={category} className="mr-2">
              <input
                type="checkbox"
                checked={interestFilter.categoryList.includes(category)}
                onChange={() => handleCategoryChange(category)} 
              />
              {category}
            </label>
          ))}
        </div>
        <Button onClick={handleSubmit} className="mt-4">Submit</Button>
      </CardContent>
    </Card>
  );
};

export default InterestFilterFormView;
