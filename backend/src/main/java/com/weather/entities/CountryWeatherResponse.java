package com.weather.entities;

public record CountryWeatherResponse(WeatherResponse coldest, WeatherResponse hottest) {
}
