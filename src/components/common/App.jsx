import React, { useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import HomeView from './HomeView';
import View from './ViewWrapper';
import Pricing from './Pricing';
import ApiDocsView from './ApiDocsView';
import ViewWrapperAnalytics from './ViewWrapperAnalytics';

// Microservices Components
import Chat from '../microservices/chats/Chat';
import Chats from '../microservices/chats/Chats';
import ProfileComponent from "../microservices/users/ProfileComponent";
import SettingsComponent from "../microservices/users/SettingsComponent";
import FriendsComponent from "../microservices/users/FriendsComponent";
import ItinerariesFeedView from "../microservices/feeds/ItinerariesFeedView";
import InterestFilterFormView from '../microservices/feeds/interestFilterFormView';
import ItineraryDetail from "../microservices/itineraries/ItineraryDetail";
import ItineraryNew from "../microservices/itineraries/ItineraryNew";
import Forecast from '../microservices/itineraries/Forecast';
import ExploreView from "../microservices/publications/ExploreView";
import AnalyticsView from '../microservices/analytics/analytics-dashboard';
import ReportForm from '../microservices/reports/report-form';
import NotificationsPage from '../common/ViewWrapperNotifications';

// Context
import { UserContextProvider } from '@/contexts/UserContext';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => setUser(null);

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

          {/* Feeds */}
          <Route path="/itineraries-feed" element={<View><ItinerariesFeedView /></View>} />
          <Route path="/interest-filters/:userId" element={<View><InterestFilterFormView /></View>} />

          {/* Chats */}
          <Route path="/chats" element={<View><Chats /></View>} />
          <Route path="/chats/:userId" element={<View><Chat /></View>} />

          {/* Itineraries */}
          <Route path="/itineraries/new" element={<View><ItineraryNew mode="new" /></View>} />
          <Route path="/itineraries/:itineraryId" element={<View><ItineraryDetail /></View>} />
          <Route path="/itineraries/:itineraryId/edit" element={<View><ItineraryNew mode="update" /></View>} />
          <Route path="/forecast/:itineraryId/:activityId" element={<View><Forecast /></View>} />

          {/* Publications */}
          <Route path="/explore" element={<View><ExploreView /></View>} />

          {/* API Docs */}
          <Route path="/api-docs" element={<View><ApiDocsView /></View>} />

          {/* Pricing */}
          <Route path="/pricing" element={<View><Pricing /></View>} />

          {/* Analytics */}
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
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
