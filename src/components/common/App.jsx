import React, { useEffect } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ItinerariesFeedView from '../microservices/feeds/ItinerariesFeedView'
import ItineraryDetail from '../microservices/itineraries/ItineraryDetail'
import HomeView from './HomeView';
import View from './ViewWrapper';
import ItineraryNew from '../microservices/itineraries/ItineraryNew';
import ExploreView from '../microservices/publications/ExploreView';
import ApiDocsView from './ApiDocsView';
import InterestFilterFormView from '../microservices/feeds/InterestFilterFormView';
import { UserContextProvider } from '@/contexts/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<HomeView />} />
          
          {/*Añadir todas las rutas de los microservicios aquí*/}
          {/*FEEDS*/}
          <Route path="/itineraries-feed" element={<View> <ItinerariesFeedView /></View>} />
          <Route path="/interest-filters/:userId" element={<View><InterestFilterFormView /></View>} />
          {/*CHATS*/}
          <Route path="/chats" element={<ItinerariesFeedView />} />
          <Route path="/chats/:writerUserId/:receiverUserId" element={<ItinerariesFeedView />} />
          {/* ITINERARIES */}
          <Route path="/itineraries/new" element={<View> <ItineraryNew mode="new" /> </View>} />
          <Route path="/itineraries/:itineraryId" element={<View> <ItineraryDetail /> </View>} />
          <Route path="/itineraries/:itineraryId/edit" element={<View> <ItineraryNew mode="update" /> </View>} />
          {/* PUBLICATIONS */}
          <Route path="/explore" element={<View><ExploreView /></View>} />
          {/* API DOCS */}
          <Route path="/api-docs" element={<View> <ApiDocsView /> </View>} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  )
};

export default App
