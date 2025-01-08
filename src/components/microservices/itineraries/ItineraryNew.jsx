import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Activities from './Activities';
import { itinerarySchema } from '@/components/microservices/itineraries/itinerariesFormsValidators';
import { getItineraryById, createItinerary, updateItineraryById } from '@/services/microservices/itinerariesService';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContext';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GoToLogin from '@/components/common/GoToLogin';

const ItineraryNew = ({ mode }) => {
  const { itineraryId } = useParams();
  const { loggedInUser } = useContext(UserContext);
  const [itinerary, setItinerary] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    activities: [],
    comments: [],
    reviews: [],
    category: 'NATURE'
  });
  const [message, setMessage] = useState('');
  const form = useForm({
    resolver: zodResolver(itinerarySchema),
    defaultValues: itinerary,
  });

  useEffect(() => {

    if (mode === 'update' && itineraryId) {
      const fetchItinerary = async () => {
        try {
          const data = await getItineraryById(itineraryId);
          if (data.userId !== loggedInUser.id) {
            setMessage('Access Denied');
            return;
          }
          data.startDate = new Date(data.startDate).toISOString().slice(0, 16);
          data.endDate = new Date(data.endDate).toISOString().slice(0, 16);
          setItinerary(data);
          Object.keys(data).forEach(key => form.setValue(key, data[key]));
        } catch (err) {
          console.error('Failed to fetch itinerary', err);
        }
      };
      fetchItinerary();
    }

  }, [mode, itineraryId, loggedInUser, form]);

  const handleAddActivity = (activity) => {
    setItinerary({ ...itinerary, activities: [...itinerary.activities, activity] });
  };

  const onSubmit = async (data) => {
    try {
      if (mode === 'new') {
        const createdItinerary = await createItinerary(data);
        window.location.href = `/itineraries/${createdItinerary._id}`;
      } else {
        await updateItineraryById(itineraryId, data);
        window.location.href = `/itineraries/${itineraryId}`;
      }
    } catch (err) {
      console.error('Failed to save itinerary', err);
    }
  };

  console.log(`ItineraryNew mode: ${mode}, loggedInUser: ${loggedInUser?.id}`);
  if (!loggedInUser?.id) {
    return <GoToLogin />;
  }

  return (
    <div>
      {message && <div>{message}</div>}
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{mode === 'new' ? 'New Itinerary' : 'Update Itinerary'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Itinerary name</FormLabel>
                    <FormControl>
                      <Input placeholder="Itinerary name" {...field} className="mb-2" />
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
                      <Textarea placeholder="Description" {...field} className="mb-2" />
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
                      <Input type="datetime-local" {...field} className="mb-2" />
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
                      <Input type="datetime-local" {...field} className="mb-2" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <br/>
                    <FormControl>
                      <select {...field} className="mb-2">
                        <option value="NATURE">NATURE</option>
                        <option value="CITY">CITY</option>
                        <option value="CULTURE">CULTURE</option>
                        <option value="ADVENTURE">ADVENTURE</option>
                        <option value="RELAX">RELAX</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              Please save the itinerary first before adding activities.
              <br></br>
              <Button type="submit" className="mt-4">{mode === 'new' ? 'Save Itinerary' : 'Update Itinerary'}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryNew;
