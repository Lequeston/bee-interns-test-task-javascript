import { useState } from 'react';

const useWeather = () => {
  const [position, setPosition] = useState<any>(undefined);
  const [weather, setWeather] = useState<any>(undefined);
};
