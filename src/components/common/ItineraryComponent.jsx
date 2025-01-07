import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MapPinIcon } from 'lucide-react'

const ItineraryComponent = ({ itinerary }) => {
  const { name, description, startDate, endDate, category } = itinerary

  return (
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
        <div className="flex items-center text-sm text-gray-500">
          <MapPinIcon className="mr-2 h-4 w-4" />
          {category}
        </div>
      </CardContent>
    </Card>
  )
}

export default ItineraryComponent

