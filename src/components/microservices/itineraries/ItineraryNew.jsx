import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Activities from './Activities';

const ItineraryNew = ({ onSave }) => {
  const [itinerary, setItinerary] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    activities: [],
    comments: [],
    reviews: [],
    category: ''
  });

  const handleAddActivity = (activity) => {
    setItinerary({ ...itinerary, activities: [...itinerary.activities, activity] });
  };

  const handleSave = () => {
    onSave(itinerary);
    setItinerary({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      activities: [],
      comments: [],
      reviews: [],
      category: ''
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">New Itinerary</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Itinerary name"
          value={itinerary.name}
          onChange={(e) => setItinerary({ ...itinerary, name: e.target.value })}
          className="mb-2"
        />
        <Textarea
          placeholder="Description"
          value={itinerary.description}
          onChange={(e) => setItinerary({ ...itinerary, description: e.target.value })}
          className="mb-2"
        />
        <Input
          type="datetime-local"
          value={itinerary.startDate}
          onChange={(e) => setItinerary({ ...itinerary, startDate: e.target.value })}
          className="mb-2"
        />
        <Input
          type="datetime-local"
          value={itinerary.endDate}
          onChange={(e) => setItinerary({ ...itinerary, endDate: e.target.value })}
          className="mb-2"
        />
        <Activities activities={itinerary.activities} onAddActivity={handleAddActivity} userAddons={false} />
        <Button onClick={handleSave} className="mt-4">Save Itinerary</Button>
      </CardContent>
    </Card>
  );
};

export default ItineraryNew;
