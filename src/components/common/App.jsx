import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from "./HomeView";
import View from "./ViewWrapper";
import ProfileComponent from "../microservices/users/ProfileComponent";
import SettingsComponent from "../microservices/users/SettingsComponent";
import ItinerariesFeedView from "../microservices/feeds/ItinerariesFeedView";
import ItineraryDetail from "../microservices/itineraries/ItineraryDetail";
import ItineraryNew from "../microservices/itineraries/ItineraryNew";
import ExploreView from "../microservices/publications/ExploreView";
import FriendsComponent from "../microservices/users/FriendsComponent";


const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* HOME - Login/Register or Main content */}
        <Route path="/" element={<HomeView user={user} onLogin={handleLogin} onLogout={handleLogout} />} />

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

        {/* Existing routes - protected */}
        <Route 
          path="/itineraries-feed" 
          element={user ? <View><ItinerariesFeedView /></View> : <Navigate to="/" />} 
        />
        <Route 
          path="/interest-filters/:userId" 
          element={user ? <ItinerariesFeedView /> : <Navigate to="/" />} 
        />
        <Route 
          path="/chats" 
          element={user ? <ItinerariesFeedView /> : <Navigate to="/" />} 
        />
        <Route 
          path="/chats/:writerUserId/:receiverUserId" 
          element={user ? <ItinerariesFeedView /> : <Navigate to="/" />} 
        />
        <Route 
          path="/itineraries/new" 
          element={user ? <View><ItineraryNew /></View> : <Navigate to="/" />} 
        />
        <Route 
          path="/itineraries/:itineraryId" 
          element={user ? <View><ItineraryDetail /></View> : <Navigate to="/" />} 
        />
        <Route 
          path="/explore" 
          element={user ? <View><ExploreView /></View> : <Navigate to="/" />} 
        />
      </Routes>
    </BrowserRouter>
  )
};

export default App;

