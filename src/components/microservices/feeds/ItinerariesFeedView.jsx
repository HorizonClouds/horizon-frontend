import React, { useState, useEffect } from 'react';
import ItineraryCard from '../itineraries/ItineraryCard'
import { PlusCircle, RefreshCw } from 'lucide-react'
import { Button } from "@/components/ui/button"
import feedsService from '@/services/microservices/feedsService'
import usersService from '@/services/microservices/usersService'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks/use-toast'

const ItinerariesFeedView = () => {

    const [feedResponse, setFeedResponse] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const loggedUserId = usersService.getLoggedUser()?.id;
    const { toast } = useToast();

    const fetchFeedAndReRender = async () => {
        try {
            let feed = await feedsService.getItinerariesFeedByUserId(loggedUserId || 'default');
            setFeedResponse(feed || []);
            toast({ title: 'Success', description: 'Itineraries fetched successfully' });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to fetch itineraries' });
        }
    };
    // This method is called when the component is mounted (first render)
    useEffect(() => {
        toast({ title: 'Test Toast', description: 'This is a test toast' });

        fetchFeedAndReRender();
        
    }, []);

    useEffect(() => {
        // This effect will run whenever feedResponse changes
    }, [feedResponse]);

    const handleRefresh = async () => {
        try {
            let feed = await feedsService.updateItinerariesFeedByUserId(loggedUserId || 'default');
            setFeedResponse(feed || []);
            toast({ title: 'Success', description: 'Itineraries refreshed successfully' });
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to refresh itineraries' });
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Itinerary Feed</h1>
            </div>
            <div className="flex flex-wrap gap-2">
                <Link to="/itineraries/new">
                <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Itinerary
                </Button>
                </Link>
                <Link to={`/interest-filters/${loggedUserId}`} key={loggedUserId}>
                <Button variant="outline" size="sm" >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Interest Filter
                </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh
                </Button>
            </div>
            <br></br>
            <div className="space-y-6">
                {feedResponse?.data?.itineraryList?.map((itinerary) => (
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
