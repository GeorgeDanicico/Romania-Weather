# Romania Temperature Extremes

This project uses Quarkus, the Supersonic Subatomic Java Framework.

## Before running the application

Login into weatherapi.com and get an API key. 
Create a file `.env` file in the root of the project: 
```shell script
touch .env
``` package com.weather.endpoint;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class WeatherEndpointTest {

    @Test
    public void testGetWeatherEndpoint() {
        given()
          .when().get("/api/weather")
          .then()
             .statusCode(200)
             .body(is("Expected response body"));
    }
}
and add the following line:
```WEATHER_API_KEY=your_api_key```

## Running the application in dev mode

You can run your application in dev mode that enables live coding using:

```shell script
./mvnw quarkus:dev
```

