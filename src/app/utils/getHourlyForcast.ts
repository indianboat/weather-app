export const getHourlyForcast = async (lat: number, lon: number) => {

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b5d021b98d04e2ebb223bc04aa1a2d3d&cnt=6&units=metric`;

  const response = await fetch(url);
  const data = await response.json();
  return data
};
