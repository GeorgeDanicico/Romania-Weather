"use client";

import { Card, CardBody } from "@heroui/card";
import { useTheme } from "next-themes";

import { themeConfig } from "@/config/theme";
import { WeatherResponse } from "@/types/weather";
import { WeatherIcons } from "@/components/weather-icons";
import { title } from "@/components/primitives";

export function WeatherCard({
  data,
  type,
}: {
  data: WeatherResponse;
  type: "hottest" | "coldest";
}) {
  const { theme } = useTheme();
  const currentTheme = (
    theme === "dark" ? "dark" : "light"
  ) as keyof typeof themeConfig;
  const isHot = type === "hottest";
  const themeStyles = isHot
    ? themeConfig[currentTheme].hotCard
    : themeConfig[currentTheme].coldCard;

  return (
    <Card
      className={`max-w-2xl w-full border ${themeStyles.background} ${themeStyles.border}`}
    >
      <CardBody className="text-center p-8">
        <div className="flex flex-col items-center">
          <h2
            className={title({ color: isHot ? "yellow" : "blue", size: "md" })}
          >
            {isHot ? "Hottest" : "Coldest"} Location
          </h2>

          <div className="mb-8">
            <WeatherIcons weatherData={data} />
          </div>

          <div className="space-y-4 w-full">
            <p className="text-3xl font-semibold">{data.location.name}</p>
            <p className="text-xl text-gray-500">
              {data.location.region}, {data.location.country}
            </p>
            <p
              className={title({
                color: isHot ? "yellow" : "blue",
                size: "sm",
              })}
            >
              {data.current.temperature}°C
            </p>
            <div className="text-base mt-8 space-y-3">
              <p className="text-xl">
                Feels like: {data.current.feelsLikeTemperature}°C
              </p>
              <p className="text-xl">Humidity: {data.current.humidity}%</p>
              <p className="text-xl">UV Index: {data.current.uvIndex}</p>
              {data.current.precipitationMm > 0 && (
                <p className="text-xl">
                  Precipitation: {data.current.precipitationMm}mm
                </p>
              )}
              <p className="text-xl">Cloud cover: {data.current.cloud}%</p>
            </div>
            <p className="text-base mt-6">
              Last updated: {data.current.lastUpdated}
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
