import React from 'react';
import { Link } from 'react-router-dom';

const GoToPricing = ({ message }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl font-semibold mb-4">Upgrade to Pro</h2>
            <p className="mb-4">{message || 'This feature is available for Pro users only. Please upgrade your plan to access this feature.'}</p>
            <Link to="/pricing">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Go to Pricing</button>
            </Link>
        </div>
    );
};

export default GoToPricing;
