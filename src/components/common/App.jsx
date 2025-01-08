import HomeView from './HomeView';
import View from './ViewWrapper';
import Chat from '../microservices/chats/Chat';
import Chats from '../microservices/chats/Chats';
import Pricing from './Pricing';
import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import ProfileComponent from "../microservices/users/ProfileComponent";
import SettingsComponent from "../microservices/users/SettingsComponent";
import ItinerariesFeedView from "../microservices/feeds/ItinerariesFeedView";
import ItineraryDetail from "../microservices/itineraries/ItineraryDetail";
import ItineraryNew from "../microservices/itineraries/ItineraryNew";
import ExploreView from "../microservices/publications/ExploreView";
import FriendsComponent from "../microservices/users/FriendsComponent";
import ApiDocsView from './ApiDocsView';
import InterestFilterFormView from '../microservices/feeds/InterestFilterFormView';
import { UserContextProvider } from '@/contexts/UserContext';


const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View> <ItinerariesFeedView /></View>} />
          {/* HOME - Login/Register or Main content */}
          <Route path="/login" element={<HomeView user={user} onLogin={handleLogin} onLogout={handleLogout} />} />

          {/* Profile */}
          <Route
            path="/profile"
            element={user ? <View><ProfileComponent user={user} /></View> : <Navigate to="/" />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={user ? <View><SettingsComponent user={user} /></View> : <Navigate to="/" />}
          />
          <Route
            path="/friends"
            element={user ? <View><FriendsComponent /></View> : <Navigate to="/" />}
          />

          {/*Añadir todas las rutas de los microservicios aquí*/}
          {/*FEEDS*/}
          <Route path="/itineraries-feed" element={<View> <ItinerariesFeedView /></View>} />
          <Route path="/interest-filters/:userId" element={<View><InterestFilterFormView /></View>} />
          {/*CHATS*/}
          <Route path="/chats" element={<View><Chats /></View>} />
          <Route path="/chats/:userId" element={<View><Chat /></View>} />
          {/* ITINERARIES */}
          <Route path="/itineraries/new" element={<View> <ItineraryNew mode="new" /> </View>} />
          <Route path="/itineraries/:itineraryId" element={<View> <ItineraryDetail /> </View>} />
          <Route path="/itineraries/:itineraryId/edit" element={<View> <ItineraryNew mode="update" /> </View>} />
          {/* PUBLICATIONS */}
          <Route path="/explore" element={<View><ExploreView /></View>} />
          {/* API DOCS */}
          <Route path="/api-docs" element={<View> <ApiDocsView /> </View>} />
          {/* PRICING */}
          <Route path="/pricing" element={<View> <Pricing /> </View>} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;

