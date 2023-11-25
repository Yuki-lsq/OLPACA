import axios from "axios";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const fetchWeatherInfo = async (latitude: string, longitude: string) => {
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: `${latitude},${longitude}` },
    headers: {
      "X-RapidAPI-Key": WEATHER_API_KEY,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const fetchForecastWeather = async (location: string) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: location, 
      days: '3'
    },
    headers: {
      'X-RapidAPI-Key': WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    const { current, forecast, location } = response.data
    console.log(forecast);
    return forecast
  } catch(error) {
    console.error(error);
  }
}
