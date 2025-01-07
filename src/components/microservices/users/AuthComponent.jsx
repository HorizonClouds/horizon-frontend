import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const AuthComponent = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Aquí deberías llamar a tu servicio de autenticación
      try {
        // Simularemos una llamada a la API
        const response = await new Promise(resolve => 
          setTimeout(() => resolve({ success: true, user: { name: username, username } }), 1000)
        );
        if (response.success) {
          onLogin(response.user);
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login.');
      }
    } else {
      // Aquí deberías llamar a tu servicio de registro
      alert('Registration functionality not implemented yet.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              )}
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <CardFooter className="flex justify-between mt-6">
              <Button type="submit">{isLogin ? 'Login' : 'Register'}</Button>
              <Button type="button" variant="outline" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to register?' : 'Already have an account?'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthComponent;
