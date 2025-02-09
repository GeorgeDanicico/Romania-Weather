package com.weather.resource;

import com.weather.entities.CountryWeatherResponse;
import com.weather.service.WeatherService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/weather")
public class WeatherResource {
    private final WeatherService weatherService;

    public WeatherResource(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public CountryWeatherResponse getWeather() {
        return weatherService.getColdestAndHottestWeather();
    }
}
