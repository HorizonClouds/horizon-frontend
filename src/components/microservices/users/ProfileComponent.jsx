import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, UserPlus, Users } from 'lucide-react';
import userService from '@/services/microservices/userService';
import friendRequestService from '@/services/microservices/friendRequestService';
import followingService from '@/services/microservices/followingService';

const ProfileComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [friendRequestId, setFriendRequestId] = useState('');
  const [friendRequestLoading, setFriendRequestLoading] = useState(false);
  const [friendRequestError, setFriendRequestError] = useState('');
  const [friendRequestSuccess, setFriendRequestSuccess] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [requestError, setRequestError] = useState('');
  const [processingRequest, setProcessingRequest] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user-id');
        if (!userId) {
          throw new Error('No user ID found');
        }
        
        const response = await userService.getUserProfile(userId);
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        setLoadingRequests(true);
        const userId = localStorage.getItem('user-id');
        if (!userId) {
          throw new Error('No user ID found');
        }

        const response = await friendRequestService.getFriendRequests(userId);
        setFriendRequests(response.data || []);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
        setRequestError(err.message || 'Error loading friend requests');
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchFriendRequests();
  }, []);

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    setFriendRequestLoading(true);
    setFriendRequestError('');
    setFriendRequestSuccess('');

    try {
      if (!friendRequestId.trim()) {
        throw new Error('Please enter a user ID');
      }

      await friendRequestService.sendFriendRequest(friendRequestId);
      setFriendRequestSuccess('Friend request sent successfully!');
      setFriendRequestId('');
    } catch (err) {
      console.error('Error sending friend request:', err);
      setFriendRequestError(err.message || 'Error sending friend request');
    } finally {
      setFriendRequestLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action, senderUserId) => {
    setProcessingRequest(requestId);
    try {
      const currentUserId = localStorage.getItem('user-id');
      if (!currentUserId) {
        throw new Error('No user ID found');
      }

      if (action === 'accept') {
        await friendRequestService.acceptFriendRequest(requestId);
        // Create mutual follow relationship
        await followingService.followUser(currentUserId, senderUserId);
        await followingService.followUser(senderUserId, currentUserId);
      } else {
        await friendRequestService.rejectFriendRequest(requestId);
      }

      // Update the friend requests list
      setFriendRequests(prevRequests => 
        prevRequests.filter(request => request.id !== requestId)
      );
    } catch (err) {
      console.error(`Error ${action}ing friend request:`, err);
      setRequestError(`Error ${action}ing friend request`);
    } finally {
      setProcessingRequest(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-destructive text-center p-4 bg-destructive/10 rounded-lg">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center p-4">
        No se encontró información del perfil
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profile.photo} alt={profile.name} />
                <AvatarFallback className="text-2xl">{profile.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm text-muted-foreground">
                Miembro desde {new Date(profile.registrationDate).toLocaleDateString()}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Biografía</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.biography || 'No hay biografía disponible'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Estado de la cuenta</h4>
                  <p className="text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      profile.accountStatus === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile.accountStatus === 'active' ? 'Activa' : 'Inactiva'}
                    </span>
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Email verificado</h4>
                  <p className="text-sm">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      profile.verifiedEmail 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile.verifiedEmail ? 'Verificado' : 'Pendiente'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Plan actual</h3>
                <div className="flex items-center space-x-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    profile.plan === 'pro' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {profile.plan === 'pro' ? 'Plan Pro' : 'Plan Básico'}
                  </span>
                </div>
              </div>

              {profile.addons && profile.addons.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-semibold">Complementos activos</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.addons.map((addon, index) => (
                      <span 
                        key={index}
                        className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                      >
                        {addon}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Send Friend Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFriendRequest} className="space-y-4">
            {friendRequestError && (
              <div className="bg-destructive/15 text-destructive p-3 rounded-md">
                {friendRequestError}
              </div>
            )}
            {friendRequestSuccess && (
              <div className="bg-green-100 text-green-800 p-3 rounded-md">
                {friendRequestSuccess}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter email"
                value={friendRequestId}
                onChange={(e) => setFriendRequestId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={friendRequestLoading}>
                {friendRequestLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Request'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Friend Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingRequests ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : requestError ? (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md">
              {requestError}
            </div>
          ) : friendRequests.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No pending friend requests
            </p>
          ) : (
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.senderDetails.photo} alt={request.senderDetails.name} />
                      <AvatarFallback>
                        {request.senderDetails.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{request.senderDetails.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {request.userId}
                      </p>
                      {request.senderDetails.email && (
                        <p className="text-xs text-muted-foreground">
                          {request.senderDetails.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'accept', request.userId)}
                      disabled={processingRequest === request.id}
                    >
                      {processingRequest === request.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Accept'
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRequestAction(request.id, 'reject', request.userId)}
                      disabled={processingRequest === request.id}
                    >
                      {processingRequest === request.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        'Reject'
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileComponent;

