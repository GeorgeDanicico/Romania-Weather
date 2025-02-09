package com.weather.entities;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public record WeatherInformation (@JsonAlias("last_updated_epoch") Long lastUpdatedEpoch,
                                  @JsonAlias("last_updated") String lastUpdated,
                                  @JsonAlias("temp_c") Double temperature,
                                  @JsonAlias("is_day") Boolean isDay,
                                  @JsonAlias("precip_mm") Double precipitationMm,
                                  @JsonAlias("humidity") Integer humidity,
                                  @JsonAlias("cloud") Integer cloud,
                                  @JsonAlias("feelslike_c") Double feelsLikeTemperature,
                                  @JsonAlias("uv") Double uvIndex) {}