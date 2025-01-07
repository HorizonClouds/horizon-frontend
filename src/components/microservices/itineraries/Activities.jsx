import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, Plus, Cloud } from 'lucide-react';
import MapComponent from './MapComponent';

const Activities = ({ activities, onAddActivity, userAddons }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: { latitude: 0, longitude: 0, address: '' }
  });

  const handleAddActivity = () => {
    onAddActivity(newActivity);
    setNewActivity({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: { latitude: 0, longitude: 0, address: '' }
    });
    setShowAddForm(false);
  };

  const handleLocationSelect = (lat, lng, address) => {
    setNewActivity({
      ...newActivity,
      location: { latitude: lat, longitude: lng, address }
    });
  };

  const fetchWeatherForecast = async (lat, lon) => {
    // This is a mock function. In a real application, you would call an actual weather API.
    return { temperature: Math.round(Math.random() * 30), condition: "Sunny" };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-1" /> Add Activity
        </Button>
      </div>
      {showAddForm && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <Input
              placeholder="Activity name"
              value={newActivity.name}
              onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              className="mb-2"
            />
            <Textarea
              placeholder="Description"
              value={newActivity.description}
              onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
              className="mb-2"
            />
            <Input
              type="datetime-local"
              value={newActivity.startDate}
              onChange={(e) => setNewActivity({ ...newActivity, startDate: e.target.value })}
              className="mb-2"
            />
            <Input
              type="datetime-local"
              value={newActivity.endDate}
              onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
              className="mb-2"
            />
            <Input
              readOnly
              placeholder="Address"
              value={newActivity.location?.address}
              onChange={(e) => setNewActivity({ ...newActivity, location: { ...newActivity.location, address: e.target.value } })}
              className="mt-2 mb-2"
            />
            <MapComponent onLocationSelect={handleLocationSelect} />
            <Button onClick={handleAddActivity} className="mt-2">Add Activity</Button>
          </CardContent>
        </Card>
      )}
      <ScrollArea className="h-60 pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
        {activities.map((activity) => (
          <Card key={activity._id} className="mb-2">
            <CardContent className="p-4">
              <h4 className="font-semibold">{activity.name}</h4>
              <p className="text-sm text-gray-500">{activity.description}</p>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                <span>{new Date(activity.startDate).toLocaleString()} - {new Date(activity.endDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center mt-2 text-xs text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{activity.location?.address}</span>
              </div>
              {/* user addons includes */}
              {true && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Cloud className="w-3 h-3 mr-1" />
                  <span>Weather: Loading...</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Activities;

