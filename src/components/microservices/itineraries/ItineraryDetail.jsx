import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BoxIcon, Calendar, MapPin, MessageCircle, Star, Trash, Edit } from 'lucide-react';
import Activities from './Activities';
import Comments from './Comments';
import Reviews from './Reviews';
import { getItineraryById, addActivityToItinerary, submitCommentForItinerary, submitReviewForItinerary, deleteItineraryById, deleteActivityById, deleteCommentById, deleteReviewById } from '@/services/microservices/itinerariesService';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';

const AccordionHeader = ({ icon, title }) => (
  <div className="flex items-center">
    {icon}
    <span className="ml-2 text-lg font-semibold">{title}</span>
  </div>
);

const ItineraryDetail = () => {
  const { itineraryId } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { loggedInUser } = useContext(UserContext);

  const handleDeleteItinerary = async () => {
    try {
      await deleteItineraryById(itineraryId);
      // Redirect or update state to reflect deletion
    } catch (err) {
      setError('Failed to delete itinerary');
    }
  };

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const data = await getItineraryById(itineraryId);
        setItinerary(data);
      } catch (err) {
        setError('Failed to fetch itinerary');
      }
    };
    fetchItinerary();
  }, [itineraryId,loggedInUser]);

  const handleAddActivity = async (activity) => {
    try {
      const newActivity = await addActivityToItinerary(itineraryId, activity);
      setItinerary({ ...itinerary, activities: [...itinerary.activities, newActivity] });
      setSuccess('Activity added successfully');
    } catch (err) {
      setError('Failed to add activity');
    }
  };

  const handleDeleteActivity = async (activityId) => {
    try {
      await deleteActivityById(itineraryId, activityId);
      setItinerary({
        ...itinerary,
        activities: itinerary.activities.filter(activity => activity._id !== activityId)
      });
      setSuccess('Activity deleted successfully');
    } catch (err) {
      setError('Failed to delete activity');
    }
  };

  const handleAddComment = async (comment) => {
    try {
      const newComment = await submitCommentForItinerary(itineraryId, comment);
      setItinerary({ ...itinerary, comments: [...itinerary.comments, newComment] });
      setSuccess('Comment added successfully');
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteCommentById(commentId);
      setItinerary({
        ...itinerary,
        comments: itinerary.comments.filter(comment => comment._id !== commentId)
      });
      setSuccess('Comment deleted successfully');
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleAddReview = async (review) => {
    try {
      const newReview = await submitReviewForItinerary(itineraryId, review);
      setItinerary({ ...itinerary, reviews: [...itinerary.reviews, newReview] });
      setSuccess('Review added successfully');
    } catch (err) {
      setError('Failed to add review');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReviewById(itineraryId, reviewId);
      setItinerary({
        ...itinerary,
        reviews: itinerary.reviews.filter(review => review._id !== reviewId)
      });
      setSuccess('Review deleted successfully');
    } catch (err) {
      setError('Failed to delete review');
    }
  };

  if (!itinerary) return <div>Loading...</div>;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">{itinerary.name}</CardTitle>
          {loggedInUser && loggedInUser.id === itinerary.userId && (
            <div className="flex space-x-2">
              <Link to={`/itineraries/${itineraryId}/edit`}>
                <Button variant="primary">
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
              </Link>
              <Button variant="danger" onClick={handleDeleteItinerary}>
                <Trash className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>
          )}
          {console.log(`logged user: '${loggedInUser?.id}' itinerary user: '${itinerary.userId}'.`)}
        </div>
        <p className="text-gray-500">{itinerary.description}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-4">
            <BoxIcon className="mr-2 h-4 w-4" />
            {itinerary.category}
          </div>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        <Accordion type="multiple" defaultValue={['activities', 'comments', 'reviews']} className="space-y-4">
          <AccordionItem value="activities" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<MapPin className="w-5 h-5" />} title="Activities" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Activities activities={itinerary.activities} onAddActivity={handleAddActivity} onDeleteActivity={handleDeleteActivity} userAddons={[]} loggedInUser={loggedInUser} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="comments" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<MessageCircle className="w-5 h-5" />} title="Comments" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Comments comments={itinerary.comments} onAddComment={handleAddComment} onDeleteComment={handleDeleteComment} loggedInUser={loggedInUser} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews" className="border rounded-lg overflow-hidden">
            <AccordionTrigger className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">
              <AccordionHeader icon={<Star className="w-5 h-5" />} title="Reviews" />
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <Reviews reviews={itinerary.reviews} onAddReview={handleAddReview} onDeleteReview={handleDeleteReview} loggedInUser={loggedInUser} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ItineraryDetail;