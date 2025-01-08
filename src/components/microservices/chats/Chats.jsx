import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserContext } from '@/contexts/UserContext';
import GoToLogin from '@/components/common/GoToLogin';
import usersService from '@/services/microservices/usersService';

const getFriends = async () => {
    try {
        let friends = await usersService.getFriends();
        console.log(`Friends: `, friends);
        return friends;
    } catch (error) {
        console.error('Error fetching friends:', error);
        return [];
    }
};

const Chats = () => {
    const { loggedInUser: loggedUser } = useContext(UserContext);
    const [friends, setFriends] = useState([]);
    const [filteredFriends, setFilteredFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (loggedUser?.id) {
            getFriends().then(fetchedFriends => {
                setFriends(fetchedFriends);
                setFilteredFriends(fetchedFriends);
            });
        }
    }, [loggedUser]);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = friends.filter(friend =>
            friend.name.toLowerCase().includes(term)
        );
        setFilteredFriends(filtered);
    };

    if (!loggedUser?.id) {
        return (
            <GoToLogin />
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Your Chats</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    type="text"
                    placeholder="Search friends..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-4"
                />
                <ScrollArea className="h-[400px] pr-4">
                    {filteredFriends.map(friend => (
                        <Link to={`/chats/${friend.id}`} key={friend.id}>
                            <Card className="mb-3 hover:bg-gray-100 transition-colors">
                                <CardContent className="flex items-center p-4">
                                    <img
                                        src={friend.avatar}
                                        alt={friend.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{friend.name}</h3>
                                        <p className="text-sm text-gray-500">Click to chat</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default Chats;

