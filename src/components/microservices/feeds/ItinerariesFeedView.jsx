import React, { useEffect } from 'react'
import Navbar from '../../common/Navbar'
import ItineraryCard from '../itineraries/ItineraryCard'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import feedsService from '@/services/microservices/feedsService'
import usersService from '@/services/microservices/usersService'
import itinerariesService from '@/services/microservices/itinerariesService'
import { Link } from 'react-router-dom'
import { MOCK_ITINERARIES } from '@/components/common/utils/mocks'



const ItinerariesFeedView = () => {

    useEffect(() => {


    }, []);


    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Itinerary Feed</h1>
            </div>
            <div className="flex space-x-2 wrap">
                <Link to="/itineraries/new">
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Itinerary
                </Button>
                </Link>
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Interest Filter
                </Button>
                <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>
            <br></br>
            <div className="space-y-6">
                {MOCK_ITINERARIES.map((itinerary) => (
                    <Link to={`/itineraries/${itinerary._id}`}>
                    <div key={itinerary._id}>
                        <ItineraryCard itinerary={itinerary} />
                    </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default ItinerariesFeedView
