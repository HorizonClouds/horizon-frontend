import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Loader2, Clock } from 'lucide-react';
import userService from '@/services/microservices/userService';
import loginHistoryService from '@/services/microservices/loginHistoryService';

const SettingsComponent = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loginHistory, setLoginHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [userData, setUserData] = useState({
    name: '',
    photo: '',
    biography: '',
    email: '',
    roles: ['user']
  });

  useEffect(() => {
    fetchUserData();
    fetchLoginHistory();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }
      
      const response = await userService.getUserProfile(userId);
      setUserData(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Error loading user data');
    } finally {
      setLoading(false);
    }
  };

  const fetchLoginHistory = async () => {
    try {
      setLoadingHistory(true);
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }
      
      const response = await loginHistoryService.getLoginHistory(userId);
      // Asegurarnos de que response.data es un array, si no lo es, lo convertimos en array
      const historyData = Array.isArray(response.data) ? response.data : [response.data];
      setLoginHistory(historyData);
    } catch (err) {
      console.error('Error fetching login history:', err);
      setLoginHistory([]);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const userId = localStorage.getItem('user-id');
      if (!userId) {
        throw new Error('No user ID found');
      }

      await userService.updateProfile(userId, userData);
      setSuccess('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>
            Update your profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-800 p-3 rounded-md mb-6">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  name: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  email: e.target.value
                }))}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Photo URL</label>
              <Input
                type="url"
                value={userData.photo}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  photo: e.target.value
                }))}
              />
              {userData.photo && (
                <div className="mt-2">
                  <img
                    src={userData.photo}
                    alt="Profile preview"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Biography</label>
              <textarea
                value={userData.biography}
                onChange={(e) => setUserData(prev => ({
                  ...prev,
                  biography: e.target.value
                }))}
                className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Login History
          </CardTitle>
          <CardDescription>
            Recent login activity for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingHistory ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : loginHistory && loginHistory.length > 0 ? (
            <div className="rounded-md border">
              <div className="divide-y max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {loginHistory.map((login, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <p className="text-sm text-muted-foreground">
                        {formatDate(login.loginDate)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No login history available
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsComponent;

