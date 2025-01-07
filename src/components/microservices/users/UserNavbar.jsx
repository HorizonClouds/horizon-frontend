import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from 'lucide-react'
import usersService from '@/services/microservices/usersService';
import userService from '@/services/microservices/userService';
import feedsService from '@/services/microservices/feedsService';
import { useNavigate } from 'react-router-dom'

const UserNavbar = () => {
    const [currentUser, setCurrentUser] = useState(usersService.getLoggedUser()?.id);

    const handleUserLogin = async (userId, password) => {
        try {
            await usersService.postLogin({ userId, password });
            setCurrentUser(usersService.getLoggedUser()?.id);
            const initialInterestFilter = { 
                userId: usersService.getLoggedUser().id,
                categoryList: []
            }
            await feedsService.createInterestFilter(initialInterestFilter);
            const initialItinerariesFeed = {
                userId: usersService.getLoggedUser().id
            }
            await feedsService.createItinerariesFeed(initialItinerariesFeed);
        } catch (error) {
            console.error('Login failed', error);
        }
    };  
    const navigate = useNavigate()

    const handleLogout = () => {
      navigate('/')
    }
    const handleProfileClick = () => {
      navigate('/profile')
    }

    useEffect(() => {
        setCurrentUser(usersService.getLoggedUser()?.id);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src= {localStorage.getItem('user-photo') || ''} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>{"name:" + localStorage.getItem('user-name')}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={handleProfileClick}
                    className="cursor-pointer"
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserLogin('user1', 'password1')}>USER1</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserLogin('user2', 'password2')}>USER2</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleUserLogin('user3', 'password3')}>USER3</DropdownMenuItem>             
                <DropdownMenuItem 
                    onClick={() => navigate('/settings')}
                    className="cursor-pointer"
                >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={() => navigate('/friends')}
                    className="cursor-pointer"
                >
                    <User className="mr-2 h-4 w-4" />
                    <span>Friends</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserNavbar;