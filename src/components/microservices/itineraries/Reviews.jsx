import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from './itinerariesFormsValidators';
import { Form, FormControl, FormItem, FormLabel, FormMessage, FormField } from "@/components/ui/form";

const Reviews = ({ reviews, onAddReview }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      score: 0,
      title: '',
      message: '',
    },
  });

  const handleAddReview = (data) => {
    onAddReview({ ...data, userId: 'current-user' });
    form.reset();
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-1" /> Add Review
        </Button>
      </div>
      {showAddForm && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddReview)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating</FormLabel>
                      <FormControl>
                        <div>
                          <div hidden>

                            <Input type="number" placeholder="Rating" {...field} />
                          </div>

                          <div className="flex items-center mb-2">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <Star
                                key={score}
                                className={`w-6 h-6 cursor-pointer ${score <= field.value ? 'text-yellow-400' : 'text-gray-300'}`}
                                onClick={() => field.onChange(score)}
                              />
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review title</FormLabel>
                      <FormControl>
                        <Input placeholder="Review title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your review</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your review" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit"><Star className="w-4 h-4 mr-1" /> Submit Review</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      <ScrollArea className="h-60 pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
        {reviews.map((review) => (
          <Card key={review._id} className="mb-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.userId}`} />
                    <AvatarFallback>{review.userId.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{review.title}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{review.score}</span>
                </div>
              </div>
              <p className="text-sm">{review.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(review.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Reviews;

