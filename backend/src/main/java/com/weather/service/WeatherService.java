package com.weather.service;

import com.weather.clients.WeatherRestClient;
import com.weather.entities.CountryWeatherResponse;
import com.weather.entities.WeatherResponse;
import io.quarkus.cache.CacheKey;
import io.quarkus.cache.CacheResult;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import java.util.List;

@ApplicationScoped
public class WeatherService {
    @RestClient
    private WeatherRestClient weatherRestClient;

    @ConfigProperty(name = "weather.api-key")
    String weatherApiKey;
    @ConfigProperty(name = "weather.cities")
    List<String> cities;

    public CountryWeatherResponse getColdestAndHottestWeather(String city) {
        var sortedWeathers = cities.stream()
                .map(this::getWeatherForCity)
                .sorted()
                .toList();

        var coldestCity = sortedWeathers.getFirst();
        var hottestCity = sortedWeathers.getLast();

        return new CountryWeatherResponse(coldestCity, hottestCity);
    }

    @CacheResult(cacheName = "weather")
    public WeatherResponse getWeatherForCity(@CacheKey String city) {
        return weatherRestClient.getWeather(weatherApiKey, city, "no");
    }
}
