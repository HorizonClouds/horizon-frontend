import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import userService from '@/services/microservices/userService';

const AuthComponent = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    biography: '',
    email: '',
    password: '',
    username: '',
    roles: ['user']
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const response = await userService.login({
          username: formData.username,
          password: formData.password
        });
        
        const userData = {
          id: response.data.payload.user.user,
          roles: response.data.payload.user.roles,
          name: formData.name,
          token: response.data.token
        };

        onLogin(userData);
      } else {
        // Register with all fields
        await userService.register({
          name: formData.name,
          photo: formData.photo,
          biography: formData.biography,
          email: formData.email,
          password: formData.password,
          roles: formData.roles,
          username: formData.username
        });

        // Login after registration using username/password
        const loginResponse = await userService.login({
          username: formData.username,
          password: formData.password
        });

        const userData = {
          id: loginResponse.data.payload.user.user,
          roles: loginResponse.data.payload.user.roles,
          name: formData.name,
          token: loginResponse.data.token
        };

        onLogin(userData);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.response?.data?.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      name: '',
      photo: '',
      biography: '',
      email: '',
      password: '',
      username: '',
      roles: ['user']
    });
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin ? (
                <>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    required
                  />
                  <Input
                    type="url"
                    placeholder="Photo URL"
                    value={formData.photo}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      photo: e.target.value
                    }))}
                  />
                  <textarea
                    placeholder="Biography"
                    value={formData.biography}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      biography: e.target.value
                    }))}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required
                  />
                  <select
                    value={formData.roles[0]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      roles: [e.target.value]
                    }))}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </>
              ) : null}
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
                required
              />
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit" disabled={loading}>
                {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={resetForm}
              >
                {isLogin ? 'Need an account?' : 'Already have an account?'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthComponent;
