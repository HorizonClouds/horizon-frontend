import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ItinerariesFeedView from '../microservices/feeds/ItinerariesFeedView'
import ItineraryDetail from '../microservices/itineraries/ItineraryDetail'
import HomeView from './HomeView';
import View from './ViewWrapper';
import ViewWrapperAnalytics from './ViewWrapperAnalytics';
import ItineraryNew from '../microservices/itineraries/ItineraryNew';
import ExploreView from '../microservices/publications/ExploreView';
import AnalyticsView from '../microservices/analytics/analytics-dashboard';
import ReportForm from '../microservices/reports/report-form.jsx';
import NotificationsPage from '../common/ViewWrapperNotifications.jsx';

const App = () => {
  return (
  <BrowserRouter>
    <Routes>
      {/* HOME */}
    <Route path="/" element={<HomeView />} />

    {/*Añadir todas las rutas de los microservicios aquí*/}
    {/*FEEDS*/}
    <Route path="/itineraries-feed" element={<View> <ItinerariesFeedView /></View>} />
    <Route path="/interest-filters/:userId" element={<ItinerariesFeedView />} />
    {/*CHATS*/}
    <Route path="/chats" element={<ItinerariesFeedView />} />
    <Route path="/chats/:writerUserId/:receiverUserId" element={<ItinerariesFeedView />} />
    {/* ITINERARIES */}
    <Route path="/itineraries/new" element={<View> <ItineraryNew /> </View>} />
    <Route path="/itineraries/:itineraryId" element={<View> <ItineraryDetail /> </View>} />
    {/* PUBLICATIONS */}
    <Route path="/explore" element={<View><ExploreView /></View>} />
    {/* ANALYTICS */}
    <Route path="/analyticsReports" element={<ViewWrapperAnalytics><AnalyticsView /></ViewWrapperAnalytics>} />
    <Route path="/report" element={<ViewWrapperAnalytics><ReportForm /></ViewWrapperAnalytics>} />
    <Route path="/notifications" element={<ViewWrapperAnalytics><NotificationsPage /></ViewWrapperAnalytics>} /> </Routes>
  </BrowserRouter>
  )
};

export default App
