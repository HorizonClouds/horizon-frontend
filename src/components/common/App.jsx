import HomeView from './HomeView';
import View from './ViewWrapper';
import Chat from '../microservices/chats/Chat';
import Chats from '../microservices/chats/Chats';
import Pricing from './Pricing';
import React, { useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

// Components
import HomeView from "./HomeView";
import View from "./ViewWrapper";
import ViewWrapperAnalytics from './ViewWrapperAnalytics';
import ProfileComponent from "../microservices/users/ProfileComponent";
import SettingsComponent from "../microservices/users/SettingsComponent";
import FriendsComponent from "../microservices/users/FriendsComponent";
import ItinerariesFeedView from "../microservices/feeds/ItinerariesFeedView";
import ItineraryDetail from "../microservices/itineraries/ItineraryDetail";
import ItineraryNew from "../microservices/itineraries/ItineraryNew";
import ExploreView from "../microservices/publications/ExploreView";
import FriendsComponent from "../microservices/users/FriendsComponent";
import ApiDocsView from './ApiDocsView';
import InterestFilterFormView from '../microservices/feeds/InterestFilterFormView';
import { UserContextProvider } from '@/contexts/UserContext';

import AnalyticsView from '../microservices/analytics/analytics-dashboard';
import ReportForm from '../microservices/reports/report-form.jsx';
import NotificationsPage from '../common/ViewWrapperNotifications.jsx';

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
            element={user ? <View><ProfileComponent user={user} /></View> : <Navigate to="/login" />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={user ? <View><SettingsComponent user={user} /></View> : <Navigate to="/login" />}
          />
          <Route
            path="/friends"
            element={user ? <View><FriendsComponent /></View> : <Navigate to="/login" />}
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
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<HomeView user={user} onLogin={handleLogin} onLogout={handleLogout} />} />

        {/* USER ROUTES */}
        <Route
          path="/profile"
          element={user ? <View><ProfileComponent user={user} /></View> : <Navigate to="/" />}
        />
        <Route
          path="/settings"
          element={user ? <View><SettingsComponent user={user} /></View> : <Navigate to="/" />}
        />
        <Route
          path="/friends"
          element={user ? <View><FriendsComponent /></View> : <Navigate to="/" />}
        />

        {/* ITINERARIES */}
        <Route
          path="/itineraries-feed"
          element={user ? <View><ItinerariesFeedView /></View> : <Navigate to="/" />}
        />
        <Route
          path="/interest-filters/:userId"
          element={user ? <View><ItinerariesFeedView /></View> : <Navigate to="/" />}
        />
        <Route
          path="/itineraries/new"
          element={user ? <View><ItineraryNew /></View> : <Navigate to="/" />}
        />
        <Route
          path="/itineraries/:itineraryId"
          element={user ? <View><ItineraryDetail /></View> : <Navigate to="/" />}
        />

        {/* PUBLICATIONS */}
        <Route
          path="/explore"
          element={user ? <View><ExploreView /></View> : <Navigate to="/" />}
        />

        {/* ANALYTICS */}
        <Route
          path="/analyticsReports"
          element={user ? <ViewWrapperAnalytics><AnalyticsView /></ViewWrapperAnalytics> : <Navigate to="/" />}
        />
        <Route
          path="/report"
          element={user ? <ViewWrapperAnalytics><ReportForm /></ViewWrapperAnalytics> : <Navigate to="/" />}
        />
        <Route
          path="/notifications"
          element={user ? <ViewWrapperAnalytics><NotificationsPage /></ViewWrapperAnalytics> : <Navigate to="/" />}
        />

        {/* CHATS */}
        <Route
          path="/chats"
          element={user ? <View><ItinerariesFeedView /></View> : <Navigate to="/" />}
        />
        <Route
          path="/chats/:writerUserId/:receiverUserId"
          element={user ? <View><ItinerariesFeedView /></View> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
