package com.weather.entities;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public record Location(String name,
                       String region,
                       String country,
                       Double lat,
                       Double lon,
                       @JsonAlias("tz_id") String tzId,
                       @JsonAlias("localtime_epoch") Long localtimeEpoch,
                       @JsonAlias("localtime") String localdate) { }