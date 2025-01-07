import React from 'react'
import Navbar from './Navbar'
import ItineraryComponent from './ItineraryComponent'

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

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-6">Itinerary Feed</h1>
        <div className="space-y-6">
          {MOCK_ITINERARIES.map((itinerary) => (
            <ItineraryComponent key={itinerary._id} itinerary={itinerary} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage
