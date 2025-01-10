"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, BarChart3, Calendar, MessageSquare, RefreshCw, Star } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import analyticsService from '../../../services/microservices/analyticsService.js';
import { Toaster, toast } from "sonner";
import { ReportButton } from "../reports/report-button.jsx";
import { DeleteAnalyticButton } from "./delete-analytic-button.jsx";
import usersService from '../../../services/microservices/usersService.js';

import { EmptyState } from "./empty-state";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnalytic, setSelectedAnalytic] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const userId = usersService.getLoggedUser()?.id;
      if (!userId) {
        throw new Error('User not logged in');
      }
      const data = await analyticsService.getAnalyticsByUserId(userId);
      setAnalytics(data || []);
      setSelectedAnalytic(data || null);
      setError(null);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Error loading analytics data');
      setAnalytics([]);
      setSelectedAnalytic(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const updateAnalytics = async () => {
    try {
      setUpdating(true);
      const userId = usersService.getLoggedUser()?.id;
      if (!userId) {
        throw new Error('User not logged in');
      }
      await analyticsService.createAnalyticByUserId(userId);
      toast.success("Analytics updated successfully");
      await fetchAnalytics();
    } catch (err) {
      console.error('Error updating analytics:', err);
      toast.error("Error updating analytics");
    } finally {
      setUpdating(false);
    }
  };

  const emptyTrendData = [{
    date: new Date().toLocaleDateString(),
    comments: 0,
    reviews: 0,
    score: 0
  }];

  const overviewCards = [
    {
      title: "Total Comments",
      value: selectedAnalytic?.userItineraryAnalytic?.totalCommentsCount || 0,
      description: "Total comments across all itineraries",
      icon: MessageSquare
    },
    {
      title: "Average Comments",
      value: selectedAnalytic?.userItineraryAnalytic?.avgComments?.toFixed(1) || "0.0",
      description: "Average comments per itinerary",
      icon: BarChart3
    },
    {
      title: "Total Reviews",
      value: selectedAnalytic?.userItineraryAnalytic?.totalReviewsCount || 0,
      description: "Total reviews received",
      icon: Star
    },
    {
      title: "Average Score",
      value: selectedAnalytic?.userItineraryAnalytic?.averageReviewScore?.toFixed(1) || "0.0",
      description: "Average review score out of 5",
      icon: Activity
    }
  ];

  const trendData = analytics.length > 0
    ? analytics.map(analytic => ({
      date: new Date(analytic.analysisDate).toLocaleDateString(),
      comments: analytic.userItineraryAnalytic?.totalCommentsCount || 0,
      reviews: analytic.userItineraryAnalytic?.totalReviewsCount || 0,
      score: analytic.userItineraryAnalytic?.averageReviewScore || 0
    })).reverse()
    : emptyTrendData;

  if (error) {
    return (
      <div className="flex h-screen bg-background">
        {/* Sidebar panel */}
        <Card className="w-[350px] rounded-none h-full">
          <CardHeader className="px-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold">Analytics History</CardTitle>
                <CardDescription>Select a date to view details</CardDescription>
              </div>
              <Button
                onClick={updateAnalytics}
                disabled={updating}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
                {updating ? 'Updating...' : 'Update Analytics'}
              </Button>
            </div>
          </CardHeader>

        </Card>

        {/* Main panel */}
        <div className="flex-1">
          {/* All the other sections as in your code */}
        </div>
        <Toaster />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar panel */}
      <Card className="w-[350px] rounded-none h-full">
        <CardHeader className="px-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold">Analytics History</CardTitle>
              <CardDescription>Select a date to view details</CardDescription>
            </div>
            <Button
              onClick={updateAnalytics}
              disabled={updating}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
              {updating ? 'Updating...' : 'Update Analytics'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="px-4 py-2">
              {loading || updating ? (
                Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full mb-4" />
                ))
              ) : analytics.length === 0 ? (
                <EmptyState onUpdate={updateAnalytics} isUpdating={updating} />
              ) : (
                analytics.map((analytic) => (
                  <div
                    key={analytic._id}
                    className="flex items-center justify-between mb-3"
                  >
                    <button
                      onClick={() => setSelectedAnalytic(analytic)}
                      className={`flex-1 text-left p-4 rounded-lg flex items-center gap-4 transition-colors
                        ${selectedAnalytic?._id === analytic._id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                        }`}
                    >
                      <Calendar className="h-6 w-6" />
                      <div className="flex flex-col">
                        <span className="text-base font-medium">
                          {new Date(analytic.analysisDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs opacity-70">
                          {analytic.userItineraryAnalytic?.totalCommentsCount || 0} comments
                        </span>
                      </div>
                    </button>
                    <DeleteAnalyticButton
                      analyticId={analytic._id}
                      onDelete={fetchAnalytics}
                    />
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Main panel */}
      <div className="flex-1">
        <div className="w-full p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-tight">Itinerary Analytics</h2>
            <p className="text-lg text-muted-foreground">
              {selectedAnalytic
                ? `Selected: ${new Date(selectedAnalytic.analysisDate).toLocaleDateString()}`
                : "No data available"}
            </p>
          </div>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {overviewCards.map((card) => (
              <Card key={card.title} className="p-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium">
                    {card.title}
                  </CardTitle>
                  <card.icon className="h-7 w-7 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-16 w-[160px]" />
                  ) : (
                    <>
                      <div className="text-4xl font-bold mb-2">{card.value}</div>
                      <p className="text-base text-muted-foreground">{card.description}</p>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="text-2xl">Analytics Overview</CardTitle>
              <CardDescription>Trends over time for comments, reviews, and scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                {loading ? (
                  <Skeleton className="h-full w-full" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        padding={{ left: 20, right: 20 }}
                      />
                      <YAxis
                        yAxisId="left"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 5]}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          padding: '8px'
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        height={36}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="comments"
                        stroke="#8884d8"
                        strokeWidth={2}
                        name="Comments"
                        dot={{ strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="reviews"
                        stroke="#82ca9d"
                        strokeWidth={2}
                        name="Reviews"
                        dot={{ strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="score"
                        stroke="#ffc658"
                        strokeWidth={2}
                        name="Score (0-5)"
                        dot={{ strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Best Performing Itinerary</CardTitle>
                <CardDescription>
                  Itinerary with highest score and engagement
                </CardDescription>
              </div>
              <ReportButton
                resourceId={selectedAnalytic?._id} />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-20 w-full" />
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Activity className="h-12 w-12 text-primary" />
                    <div>
                      <h3 className="text-lg font-bold">Itinerary Name</h3>
                      <p className="text-muted-foreground">Details about the itinerary</p>
                    </div>
                  </div>
                  <Button variant="outline">View Itinerary</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default AnalyticsDashboard;
