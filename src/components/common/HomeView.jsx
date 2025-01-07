import React, { useEffect } from 'react'
import Navbar from './Navbar'
import ItineraryCard from '../microservices/itineraries/ItineraryCard'
import feedsService from '@/services/microservices/feedsService'
import usersService from '@/services/microservices/usersService'
import axios from 'axios'
import itinerariesService from '@/services/microservices/itinerariesService'
import ItinerariesFeedView from '../microservices/feeds/ItinerariesFeedView'
import ItineraryDetail from '../microservices/itineraries/ItineraryDetail'

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

const logger = console;

const testFeedsService = async () => {
  try {

    const user = await usersService.postLogin({ userId: "user2", password: "password2" });
    logger.log('Logged in user:', user);
    logger.log('CALL TO ITINERARIES');
    const iti = await axios.get('http://localhost:6900/api/v1/itineraries/api/v1/itineraries');
    logger.log('Itineraries:', iti.data);
    // Create Interest Filter
    const newFilter = await feedsService.createInterestFilter({ userId: usersService.getLoggedUser()?.id, categoryList: ["RELAX", "ADVENTURE"] });
    logger.log('Created Interest Filter:', newFilter);

    // Get Interest Filter by User ID
    const interestFilter = await feedsService.getInterestFilterByUserId("000000000000000000000001");
    logger.log('Fetched Interest Filter:', interestFilter);

    // Update Interest Filter
    const updatedFilter = await feedsService.updateInterestFilterByUserId("000000000000000000000001", { categoryList: ["CITY", "ADVENTURE"] });
    logger.log('Updated Interest Filter:', updatedFilter);

    // Delete Interest Filter
    const deleteResponse = await feedsService.deleteInterestFilterById(newFilter._id);
    logger.log('Deleted Interest Filter:', deleteResponse);
  } catch (error) {
    logger.error('Error testing feeds service:', error);
  }
};
// testFeedsService();

const HomeView = () => {
  useEffect(() => {


  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-2xl mx-auto py-8 px-4">
        <ItineraryDetail itinerary={MOCK_ITINERARIES[0]} userAddons={{}} />
        <ItinerariesFeedView />
        <button
          onClick={() => itinerariesService.TEST_ALL()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test All Itineraries
        </button>
      </main>
    </div>
  )
}

export default HomeView
