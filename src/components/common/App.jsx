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
import Chat from '../microservices/chats/Chat';
import Chats from '../microservices/chats/Chats';
import Pricing from './Pricing';

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          {/* HOME */}
          <Route path="/" element={<View> <ItinerariesFeedView /></View>} />
          
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
  )
};

export default App
