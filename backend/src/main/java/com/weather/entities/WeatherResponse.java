package com.weather.entities;

public record WeatherResponse(Location location,
                              WeatherInformation current) implements Comparable<WeatherResponse>{

    @Override
    public int compareTo(WeatherResponse other) {
        return this.current.temperature().compareTo(other.current.temperature());

    }
}
