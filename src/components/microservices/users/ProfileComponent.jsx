import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ProfileComponent = ({ user }) => {
  if (!user) {
    return <div>Loading user profile...</div>;
  }

  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch friend requests and friends
    // This is where you'd typically make API calls
    setFriendRequests([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
    setFriends([
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ]);
  }, []);

  const handleFriendRequest = (action, id) => {
    // Handle accepting or rejecting friend requests
    setFriendRequests(friendRequests.filter(request => request.id !== id));
    if (action === 'accept') {
      setFriends([...friends, friendRequests.find(request => request.id === id)]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle user search and friend requests
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Friend Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {friendRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between mb-2">
              <span>{request.name}</span>
              <div>
                <Button onClick={() => handleFriendRequest('accept', request.id)} className="mr-2">Accept</Button>
                <Button onClick={() => handleFriendRequest('reject', request.id)} variant="outline">Reject</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Friends</CardTitle>
        </CardHeader>
        <CardContent>
          {friends.map(friend => (
            <div key={friend.id} className="mb-2">
              {friend.name}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;

