import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Users } from 'lucide-react';
import followingService from '@/services/microservices/followingService';

const FriendsComponent = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const ITEMS_PER_PAGE = 10;

  const loadFriends = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }

      const response = await followingService.getFriends(userId);
      const allFriends = response.data;
      
      // Implement pagination
      const paginatedFriends = allFriends.slice(0, page * ITEMS_PER_PAGE);
      setFriends(paginatedFriends);
      setHasMore(paginatedFriends.length < allFriends.length);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError(err.message || 'Error loading friends');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFriends();
  }, [page]);

  // Implement infinite scroll
  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [handleObserver]);

  if (error) {
    return (
      <div className="text-destructive text-center p-4 bg-destructive/10 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          My Friends
        </CardTitle>
      </CardHeader>
      <CardContent>
        {friends.length === 0 && !loading ? (
          <div className="text-center py-8 text-muted-foreground">
            No friends found. Start connecting with other users!
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {friends.map((friend) => (
                <div
                  key={friend._id}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={friend.photo} alt={friend.name} />
                    <AvatarFallback>{friend.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{friend.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {friend.email}
                    </p>
                    {friend.biography && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {friend.biography}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div ref={loader} className="flex justify-center py-4">
              {loading && <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FriendsComponent;

