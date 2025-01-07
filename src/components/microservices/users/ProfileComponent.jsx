import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userService from '@/services/microservices/userService';

const ProfileComponent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem('user-id');
        if (!userId) {
          throw new Error('No user ID found');
        }
        
        const response = await userService.getUserProfile(userId);
        setProfile(response.data); // Asumiendo que los datos vienen en response.data
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Error al cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
    </div>
  );
};

export default ProfileComponent;

