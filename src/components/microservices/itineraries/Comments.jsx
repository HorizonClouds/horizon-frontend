import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Plus, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { commentSchema } from './itinerariesFormsValidators';

const Comments = ({ comments, onAddComment, onDeleteComment, loggedInUser }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      title: '',
      message: '',
    },
  });

  let commentCount = 0;

  const onSubmit = (data) => {
    onAddComment({ ...data, userId: loggedInUser.id });
    form.reset();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        {loggedInUser ? (
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="w-4 h-4 mr-1" /> Add Comment
          </Button>
        ) : (
          <p className="text-gray-500">Login to add a comment</p>
        )}
      </div>
      {showAddForm && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter a title for your comment (max 10 words)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your comment</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Your comment" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your comment (3-280 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-1" /> Add Comment
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      <ScrollArea className="h-60 pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1', 'height': 'min-content' }}>
        {comments.map((comment) => (
          <Card key={comment._id} className="mb-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.userId}`} />
                    <AvatarFallback>{comment.userId.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{comment.title}</span>
                </div>
                {loggedInUser && loggedInUser.id === comment.userId && (
                  <Button variant="danger" onClick={() => onDeleteComment(comment._id)} className="ml-2">
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm">{comment.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(comment.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Comments;

