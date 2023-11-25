import axios from "axios";
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const fetchNewTemperature = async (latitude: string, longitude: string) => {
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
    const temperature = response.data?.current?.temp_c.toString() ?? 'N/A';
    console.log(response.data);
    return temperature;
  } catch (error) {
    console.error(error);
  }
}
