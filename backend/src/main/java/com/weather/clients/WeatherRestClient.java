package com.weather.clients;

import com.weather.entities.WeatherResponse;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

@RegisterRestClient(configKey = "weather")
public interface WeatherRestClient {
    @GET
    @Path("/v1/current.json")
    @Produces("application/json")
    WeatherResponse getWeather(@QueryParam("key") String key, @QueryParam("q") String city, @QueryParam("aqi") String aqi);
}
