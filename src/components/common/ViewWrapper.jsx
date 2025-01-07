import React, { useEffect } from 'react'
import Navbar from './Navbar'
const View = ({ children }) => {
    useEffect(() => {


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
