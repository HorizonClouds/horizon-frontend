import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, MapPin, MessageCircle, Star } from 'lucide-react'
import Activities from './Activities'
import Comments from './Comments'
import Reviews from './Reviews'
import { MOCK_ITINERARIES } from '@/components/common/utils/mocks'

const AccordionHeader = ({ icon, title }) => (
  <div className="flex items-center">
    {icon}
    <span className="ml-2 text-lg font-semibold">{title}</span>
  </div>
);

const initialItinerary = MOCK_ITINERARIES[0]


const ItineraryDetail = ({ itineraryId }) => {
  
  const [itinerary, setItinerary] = useState(initialItinerary)

  const handleAddActivity = (activity) => {
    const newActivity = { ...activity, _id: `act${itinerary.activities.length + 1}` }
    setItinerary({ ...itinerary, activities: [...itinerary.activities, newActivity] })
  }

  const handleAddComment = (comment) => {
    const newComment = { ...comment, _id: `com${itinerary.comments.length + 1}`, createdAt: new Date().toISOString() }
    setItinerary({ ...itinerary, comments: [...itinerary.comments, newComment] })
  }

  const handleAddReview = (review) => {
    const newReview = { ...review, _id: `rev${itinerary.reviews.length + 1}`, createdAt: new Date().toISOString() }
    setItinerary({ ...itinerary, reviews: [...itinerary.reviews, newReview] })
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{itinerary.name}</CardTitle>
        <p className="text-gray-500">{itinerary.description}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['activities', 'comments', 'reviews']} className="space-y-4">
          <AccordionItem value="activities" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<MapPin className="w-5 h-5" />} title="Activities" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Activities activities={itinerary.activities} onAddActivity={handleAddActivity} userAddons={[]} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="comments" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<MessageCircle className="w-5 h-5" />} title="Comments" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Comments comments={itinerary.comments} onAddComment={handleAddComment} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<Star className="w-5 h-5" />} title="Reviews" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Reviews reviews={itinerary.reviews} onAddReview={handleAddReview} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default ItineraryDetail;