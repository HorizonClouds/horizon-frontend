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
