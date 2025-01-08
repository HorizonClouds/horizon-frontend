import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin, Calendar, Plus, Cloud } from 'lucide-react';
import MapComponent from './MapComponent';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activitySchema } from './itinerariesFormsValidators';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const Activities = ({ activities, onAddActivity, userAddons }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const form = useForm({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: { latitude: 0, longitude: 0, address: '' }
    },
  });

  const handleAddActivity = (data) => {
    onAddActivity(data);
    form.reset();
    setShowAddForm(false);
  };

  const handleLocationSelect = (lat, lng, address) => {
    form.setValue('location', { latitude: lat, longitude: lng, address });
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddActivity)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity name</FormLabel>
                      <FormControl>
                        <Input placeholder="Activity name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location.latitude"
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Latitude" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location.longitude"
                  render={({ field }) => (
                    <FormItem hidden>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Longitude" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Location address" {...field} readOnly/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <MapComponent onLocationSelect={handleLocationSelect} />
                <Button type="submit" className="mt-2">Add Activity</Button>
              </form>
            </Form>
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

