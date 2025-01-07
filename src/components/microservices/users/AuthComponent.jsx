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
    username: '',
    password: '',
    name: '',
    email: ''
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
        
        // Extraer los datos del usuario de la respuesta
        const userData = {
          id: response.data.payload.user.user,
          roles: response.data.payload.user.roles,
          name: formData.username, // O usar el nombre del payload si está disponible
          token: response.data.token
        };

        onLogin(userData);
      } else {
        await userService.register({
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email
        });

        // Después del registro exitoso, hacer login automático
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
      setError(error.response?.data?.message || 'Error en la autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>{isLogin ? 'Iniciar Sesión' : 'Registro'}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    type="text"
                    placeholder="Nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    required={!isLogin}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      email: e.target.value
                    }))}
                    required={!isLogin}
                  />
                </>
              )}
              <Input
                type="text"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
                required
              />
              <Input
                type="password"
                placeholder="Contraseña"
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
                {loading ? 'Cargando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({
                    username: '',
                    password: '',
                    name: '',
                    email: ''
                  });
                }}
              >
                {isLogin ? '¿Necesitas una cuenta?' : '¿Ya tienes cuenta?'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthComponent;

