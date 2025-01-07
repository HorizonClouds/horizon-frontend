import React, { useState, useEffect } from 'react';
import ItineraryCard from '../itineraries/ItineraryCard'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import feedsService from '@/services/microservices/feedsService'
import usersService from '@/services/microservices/usersService'
import { Link } from 'react-router-dom'



const ItinerariesFeedView = () => {

    const [currentItinerariesFeed, setCurrentItinerariesFeed] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const loggedUserId = usersService.getLoggedUser()?.id;

    const fetchItinerariesFeed = async () => {
        try {
            const feed = await feedsService.getItinerariesFeedByUserId(loggedUserId || 'default');
            setCurrentItinerariesFeed(feed || []);
            setSuccess('Itineraries fetched successfully');
        } catch (err) {
            setError('Failed to fetch itineraries');
        }
    };

    useEffect(() => {
        fetchItinerariesFeed();
    }, []);

    const handleRefresh = async () => {
        if (loggedUserId== "default") {
            fetchItinerariesFeed();
        }
        else {
            await feedsService.updateItinerariesFeedByUserId(loggedUserId)
            fetchItinerariesFeed();
        }
    };

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
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>
            <br></br>
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">{success}</div>}
            <div className="space-y-6">
                {currentItinerariesFeed?.data?.itineraryList?.map((itinerary) => (
                    <Link to={`/itineraries/${itinerary._id}`} key={itinerary._id}>
                    <div>
                        <ItineraryCard itinerary={itinerary} />
                    </div>
                    </Link>
                ))}
            </div>
        </div>

    )
}

export default ItinerariesFeedView
