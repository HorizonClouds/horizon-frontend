import React from 'react'
import Navbar from './Navbar'
import ItineraryCard from '../microservices/itineraries/ItineraryCard'
import feedsService from '@/services/microservices/feedsService'
import usersService from '@/services/microservices/usersService'
import itinerariesService from '@/services/microservices/itinerariesService'
import ItinerariesFeedView from "../microservices/feeds/ItinerariesFeedView"
import ItineraryDetail from "../microservices/itineraries/ItineraryDetail"
import AuthComponent from "../microservices/users/AuthComponent"

const MOCK_ITINERARIES = [
  {
    _id: "100000000000000000000001",
    userId: "000000000000000000000001",
    name: "Trip to the beach",
    description: "A relaxing trip to the beach with friends. We'll enjoy the sun, surf, and sand for a few days.",
    startDate: "2022-12-01T00:00:00.000Z",
    endDate: "2022-12-05T00:00:00.000Z",
    category: "RELAX",
    createdAt: "2022-12-01T00:00:00.000Z",
    updatedAt: "2022-12-01T00:00:00.000Z",
    activities: [],
    comments: [],
    reviews: []
  },
  {
    _id: "100000000000000000000002",
    userId: "000000000000000000000002",
    name: "Mountain hiking adventure",
    description: "An exciting hiking trip in the mountains. We'll explore beautiful trails and enjoy breathtaking views.",
    startDate: "2023-01-15T00:00:00.000Z",
    endDate: "2023-01-20T00:00:00.000Z",
    category: "ADVENTURE",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    activities: [],
    comments: [],
    reviews: []
  }
]

const HomeView = ({ user, onLogin, onLogout }) => {
  if (!user) {
    return <AuthComponent onLogin={onLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={onLogout} />
      <main className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h1>
        <ItinerariesFeedView />

      </main>
    </div>
  )
}

export default HomeView

