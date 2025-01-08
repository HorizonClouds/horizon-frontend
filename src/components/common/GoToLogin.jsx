import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const GoToLogin = () => {
    return (
        <Card className="w-full max-w-md mx-auto mt-8">
            <CardContent className="text-center py-6">
                <p className="text-lg font-semibold">You must log in to access this feature.</p>
                <Link to="/">
                    <Button className="mt-4">Go to Login</Button>
                </Link>
            </CardContent>
        </Card>
    );
};

export default GoToLogin;