"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@heroui/button";

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons";
import { WeatherData } from "@/types/weather";
import { WeatherCard } from "@/components/weather-card";
import { title } from "@/components/primitives";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:8080/api/weather");
        const data: WeatherData = await response.json();

        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12">
      <div className="absolute top-4 right-4">
        <Button
          aria-label="Toggle theme"
          className="p-2"
          variant="ghost"
          onClick={toggleTheme}
        >
          {theme === "light" ? (
            <MoonFilledIcon className="w-6 h-6" />
          ) : (
            <SunFilledIcon className="w-6 h-6" />
          )}
        </Button>
      </div>

      <h1 className={title({ color: "blue", size: "lg", orientation: "top" })}>
        Romania Temperature Extremes
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-8">
        {weatherData && (
          <>
            <WeatherCard data={weatherData.hottest} type={"hottest"} />
            <WeatherCard data={weatherData.coldest} type={"coldest"} />
          </>
        )}
      </div>
    </main>
  );
}
