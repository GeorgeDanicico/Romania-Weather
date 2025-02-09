package com.weather.service;

import com.weather.clients.WeatherRestClient;
import com.weather.entities.CountryWeatherResponse;
import com.weather.entities.Location;
import com.weather.entities.WeatherInformation;
import com.weather.entities.WeatherResponse;
import io.quarkus.cache.CacheManager;
import io.quarkus.cache.CacheName;
import io.quarkus.cache.CacheResult;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class WeatherServiceTest {

    @Mock
    WeatherRestClient weatherRestClient;

    @InjectMocks
    WeatherService weatherService;

    @Test
    public void testGetWeatherForCity() {
        var location = new Location("City1", "Region1", "Country1", 20.0,
                10.0, "UTC+2", 1111111L, "2025/01/11");
        var current = new WeatherInformation(1111111L, "2025/01/11", 10.0, false, 20.0, 20, 20, 20.0, 20.0);
        var expectedResponse = new WeatherResponse(location,  current);

        when(weatherRestClient.getWeather(null, "City1", "no"))
                .thenReturn(expectedResponse);

        WeatherResponse response = weatherService.getWeatherForCity("City1");

        assertEquals(expectedResponse, response);
    }

    @Test
    @Disabled
    public void testGetColdestAndHottestWeather() {
        var location1 = new Location("City1", "Region1", "Country1", 20.0, 10.0, "UTC+2", 1111111L, "2025/01/11");
        var current1 = new WeatherInformation(1111111L, "2025/01/11", 5.0, false, 20.0, 20, 20, 20.0, 20.0);
        var coldestWeather = new WeatherResponse(location1, current1);

        var location2 = new Location("City2", "Region2", "Country2", 30.0, 20.0, "UTC+3", 2222222L, "2025/01/12");
        var current2 = new WeatherInformation(2222222L, "2025/01/12", 30.0, true, 30.0, 30, 30, 30.0, 30.0);
        var hottestWeather = new WeatherResponse(location2, current2);

        when(weatherRestClient.getWeather(null, "City1", "no"))
                .thenReturn(coldestWeather);
        when(weatherRestClient.getWeather(null, "City2", "no"))
                .thenReturn(hottestWeather);

        CountryWeatherResponse response = weatherService.getColdestAndHottestWeather();

        assertEquals(coldestWeather.location().name(), response.coldest().location().name());
        assertEquals(hottestWeather.location().name(), response.hottest().location().name());
    }
}