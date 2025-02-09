package com.weather.resource;

import com.weather.entities.CountryWeatherResponse;
import com.weather.entities.WeatherResponse;
import com.weather.service.WeatherService;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

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
        System.out.println("Getting weather");
        return weatherService.getColdestAndHottestWeather("Cluj-Napoca");
    }
}
