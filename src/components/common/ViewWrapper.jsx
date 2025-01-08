import React, { useEffect, useContext } from 'react'
import Navbar from './Navbar'
import usersService from '@/services/microservices/usersService';
import { UserContext } from '@/contexts/UserContext';

const View = ({ children }) => {
    const { setLoggedInUser } = useContext(UserContext);

    useEffect(() => {
        const user = usersService.getLoggedUser();
        if (user) {
            setLoggedInUser(user);
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-2xl mx-auto py-8 px-4">
                {children}
            </main>
        </div>
    )
}

export default View
