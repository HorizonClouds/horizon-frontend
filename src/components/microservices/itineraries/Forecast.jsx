import React, { useState, useEffect, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Bar, ComposedChart } from 'recharts';
import { format, parseISO } from 'date-fns';
import { Cloud, Droplets, Thermometer } from 'lucide-react';
import { useParams } from 'react-router-dom';
import itinerariesService from '@/services/microservices/itinerariesService';
import GoToLogin from '@/components/common/GoToLogin';
import { UserContext } from '@/contexts/UserContext';
import GoToPricing from '@/components/common/GoToPricing';

let LATITUDE = 37.375;
let LONGITUDE = -6;

const Forecast = () => {
    const {itineraryId, activityId} = useParams();
  const [forecastData, setForecastData] = useState(null);

  const { loggedInUser } = useContext(UserContext);

  console.log(loggedInUser);

  const fetchForecastData = async () => {
    try {
      const response = await itinerariesService.getActivityForecast(itineraryId,activityId);
      console.log(response);
;
      let  data = response
      
      LONGITUDE = data.longitude;
      LATITUDE = data.latitude;
      
      const processedData = data.daily.time.map((time, index) => ({
        date: time,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        rainSum: data.daily.rain_sum[index],
        precipProb: data.daily.precipitation_probability_max[index],
      }));

      setForecastData(processedData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };
  useEffect(() => {
    
    if (!loggedInUser?.id) {
      return;
    }
    if (!loggedInUser?.addons.includes("addon2") && !loggedInUser?.addons.includes("all")) {
        return;
    }
    fetchForecastData();
  }, []);


  if (!loggedInUser?.id) {
    return <GoToLogin />;
}
// if user . addons does not have "addon2" or "all", return a message to pricing page
  if (!loggedInUser?.addons.includes("addon2") && !loggedInUser?.addons.includes("all")) {
      return <GoToPricing message="This feature is only available with the Weather Addon. Upgrade now to access it!" />;
  }

  if (!forecastData) {
    return <div className="text-center p-8">Loading forecast data...</div>;
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="text-3xl font-bold">7-Day Weather Forecast</CardTitle>
        <CardDescription className="text-white/80">
          Location: {LATITUDE.toFixed(2)}°N, {LONGITUDE.toFixed(2)}°W
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200">
            <CardContent className="flex items-center justify-between p-4">
              <Thermometer className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{Math.max(...forecastData.map(d => d.maxTemp))}°C</p>
                <p className="text-sm text-gray-600">Highest Temperature</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-100 to-blue-200">
            <CardContent className="flex items-center justify-between p-4">
              <Thermometer className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{Math.min(...forecastData.map(d => d.minTemp))}°C</p>
                <p className="text-sm text-gray-600">Lowest Temperature</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-gray-100 to-gray-200">
            <CardContent className="flex items-center justify-between p-4">
              <Droplets className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{Math.max(...forecastData.map(d => d.precipProb))}%</p>
                <p className="text-sm text-gray-600">Highest Precipitation Probability</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart data={forecastData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(parseISO(date), 'MMM d')}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px', border: 'none' }}
              labelFormatter={(label) => format(parseISO(label), "MMMM d, yyyy")}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="maxTemp" 
              stroke="#ff7300" 
              name="Max Temperature (°C)"
              strokeWidth={2}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="minTemp" 
              stroke="#8884d8" 
              name="Min Temperature (°C)"
              strokeWidth={2}
            />
            <Bar 
              yAxisId="right"
              dataKey="rainSum" 
              fill="#82ca9d" 
              name="Rain Sum (mm)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="precipProb" 
              stroke="#ffc658" 
              name="Precipitation Probability (%)"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Forecast;