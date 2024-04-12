export const getWeather = async (city: String, country_code: String = "IN") => {

  // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b5d021b98d04e2ebb223bc04aa1a2d3d&units=metric`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_code}&appid=b5d021b98d04e2ebb223bc04aa1a2d3d&units=metric` // for city name API

  const response = await fetch(url);
  const data = await response.json();
  return data;

};
