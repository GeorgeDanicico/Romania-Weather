package com.weather.endpoint;

import com.weather.resource.WeatherResource;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class WeatherEndpointTest {

    @TestHTTPEndpoint(WeatherResource.class)
    @TestHTTPResource
    URL url;

    @Test
    public void testGetWeathers() throws IOException {
        try (InputStream in = url.openStream()) {
            String contents = new String(in.readAllBytes(), StandardCharsets.UTF_8);
            Assertions.assertTrue(contents.contains("coldest"));
            Assertions.assertTrue(contents.contains("hottest"));
        }
    }
}