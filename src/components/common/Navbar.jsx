import React from 'react'
import { Button } from "@/components/ui/button"
import { Home, List, Compass, User } from 'lucide-react';
import UserNavbar from '../microservices/users/UserNavbar'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/itineraries-feed" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-blue-600">HorizonClouds</span>
            </Link>
          </div>
          <div className="flex">
            <Link to="/itineraries-feed" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <List className="w-5 h-5 mr-1" />
              Feed
            </Link>
            <Link to="/explore" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <Compass className="w-5 h-5 mr-1" />
              Explore
            </Link>
            <Link to="/analyticsReports" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <Compass className="w-5 h-5 mr-1" />
              Analytics
            </Link>
            <Link to="/notifications" className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <Compass className="w-5 h-5 mr-1" />
              Notifications
            </Link>
          </div>
          <div className="flex">
            <div className="ml-8 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <UserNavbar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar

