import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BoxIcon, CalendarIcon, MapPinIcon , PlusCircle, RefreshCw} from 'lucide-react'
import { Button } from "@/components/ui/button"

const ItineraryCard = ({ itinerary }) => {
  const { name, description, startDate, endDate, category, activities } = itinerary

  return (
    <>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-gray-500">{category}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <BoxIcon className="mr-2 h-4 w-4" />
            {category}
          </div>
          <div className="text-sm text-gray-500 mb-4">
            <h4 className="font-semibold mb-2">Activities:</h4>
            <ul className="list-disc list-inside">
              {activities.map((activity, index) => (
                <li key={index}>
                  {new Date(activity.startDate).toLocaleDateString()} - {activity.name}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card></>
  )
}

export default ItineraryCard

