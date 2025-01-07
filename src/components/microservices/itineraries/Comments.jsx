import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Plus } from 'lucide-react';

const Comments = ({ comments, onAddComment }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newComment, setNewComment] = useState({ userId: 'current-user', title: '', message: '' });

  const handleAddComment = () => {
    onAddComment(newComment);
    setNewComment({ userId: 'current-user', title: '', message: '' });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-1" /> Add Comment
        </Button>
      </div>
      {showAddForm && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <Input
              placeholder="Title"
              value={newComment.title}
              onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
              className="mb-2"
            />
            <Textarea
              placeholder="Your comment"
              value={newComment.message}
              onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
              className="mb-2"
            />
            <Button onClick={handleAddComment}><MessageCircle className="w-4 h-4 mr-1" /> Add Comment</Button>
          </CardContent>
        </Card>
      )}
      <ScrollArea className="h-60 pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#888 #f1f1f1' }}>
        {comments.map((comment) => (
          <Card key={comment._id} className="mb-2">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.userId}`} />
                  <AvatarFallback>{comment.userId.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{comment.title}</span>
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

