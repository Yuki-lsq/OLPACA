const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function getWeatherProps(latitude: string, longitude: string) {
  const axios = require("axios");
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
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.error(error);
  }
}
