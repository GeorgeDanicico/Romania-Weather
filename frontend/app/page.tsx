'use client';

import { useState, useEffect } from 'react';
import { Card, CardBody } from "@heroui/card";
import { useTheme } from 'next-themes';
import { themeConfig } from '@/config/theme';
import { Button } from "@heroui/button";
import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { WeatherData, WeatherResponse } from '@/types/weather';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const currentTheme = (theme === 'dark' ? 'dark' : 'light') as keyof typeof themeConfig;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/api/weather');
        const data: WeatherData = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading weather data...</p>
      </div>
    );
  }

  const renderWeatherCard = (data: WeatherResponse, type: 'hottest' | 'coldest') => {
    const isHot = type === 'hottest';
    const themeStyles = isHot ? themeConfig[currentTheme].hotCard : themeConfig[currentTheme].coldCard;

    return (
      <Card 
        className={`max-w-md border ${themeStyles.background} ${themeStyles.border}`}
      >
        <CardBody className="text-center">
          <h2 className={`text-2xl font-bold mb-4 ${themeStyles.text}`}>
            {isHot ? 'Hottest' : 'Coldest'} Location
          </h2>
          <div className="space-y-2">
            <p className="text-xl">{data.location.name}</p>
            <p className="text-sm text-gray-500">
              {data.location.region}, {data.location.country}
            </p>
            <p className={`text-3xl font-bold ${themeStyles.text}`}>
              {data.current.temperature}°C
            </p>
            <div className="text-sm mt-4">
              <p>Feels like: {data.current.feelsLikeTemperature}°C</p>
              <p>Humidity: {data.current.humidity}%</p>
              <p>UV Index: {data.current.uvIndex}</p>
            </div>
            <p className="text-xs mt-2">
              Last updated: {data.current.lastUpdated}
            </p>
          </div>
        </CardBody>
      </Card>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <Button
          className="p-2"
          variant="ghost"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <MoonFilledIcon className="w-6 h-6" />
          ) : (
            <SunFilledIcon className="w-6 h-6" />
          )}
        </Button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Temperature Extremes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {weatherData && (
          <>
            {renderWeatherCard(weatherData.hottest, 'hottest')}
            {renderWeatherCard(weatherData.coldest, 'coldest')}
          </>
        )}
      </div>
    </main>
  );
}
