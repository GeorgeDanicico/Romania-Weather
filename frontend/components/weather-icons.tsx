import Image from "next/image";

import { WeatherResponse } from "@/types/weather";

interface WeatherIconProps {
  className?: string;
}

const BaseIcon = ({
  src,
  alt,
  className = "w-12 h-12",
}: WeatherIconProps & { src: string; alt: string }) => (
  <div className={className}>
    <Image
      alt={alt}
      className="w-full h-full object-contain"
      height="125"
      src={src}
      width="125"
    />
  </div>
);

export const SunIcon = (props: WeatherIconProps) => (
  <BaseIcon {...props} alt="Sunny day" src="/day.png" />
);

export const MoonStarsIcon = (props: WeatherIconProps) => (
  <BaseIcon {...props} alt="Night time" src="/night.png" />
);

export const CloudIcon = (props: WeatherIconProps) => (
  <BaseIcon {...props} alt="Cloudy weather" src="/cloud.png" />
);

export const RainIcon = (props: WeatherIconProps) => (
  <BaseIcon {...props} alt="Rainy weather" src="/rain.png" />
);

export const SnowIcon = (props: WeatherIconProps) => (
  <BaseIcon {...props} alt="Snowy weather" src="/snow.png" />
);

interface IWeatherIconsProps {
  weatherData: WeatherResponse;
}
export const WeatherIcons: React.FC<IWeatherIconsProps> = (
  props: IWeatherIconsProps,
) => {
  const { temperature, isDay, cloud, precipitationMm } =
    props.weatherData.current;
  const icons: JSX.Element[] = [];

  if (isDay) {
    icons.push(<SunIcon key="day" className="w-24 h-24" />);
  } else {
    icons.push(<MoonStarsIcon key="night" className="w-24 h-24" />);
  }

  if (cloud > 50) {
    icons.push(<CloudIcon key="cloud" className="w-20 h-20" />);
  }

  if (precipitationMm > 0) {
    icons.push(<RainIcon key="rain" className="w-20 h-20" />);
  }

  if (temperature < 0) {
    icons.push(<SnowIcon key="snow" className="w-20 h-20" />);
  }

  return <div className="relative inline-block flex">{icons}</div>;
};
