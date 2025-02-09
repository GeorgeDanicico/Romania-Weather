export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tzId: string;
  localtimeEpoch: number;
  localdate: string;
}

export interface WeatherInformation {
  lastUpdatedEpoch: number;
  lastUpdated: string;
  temperature: number;
  isDay: boolean;
  precipitationMm: number;
  humidity: number;
  cloud: number;
  feelsLikeTemperature: number;
  uvIndex: number;
}

export interface WeatherResponse {
  location: Location;
  current: WeatherInformation;
}

export interface WeatherData {
  hottest: WeatherResponse;
  coldest: WeatherResponse;
}
