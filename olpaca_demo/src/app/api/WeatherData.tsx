export async function getWeatherProps() {
  const axios = require("axios");
  const options = {
    method: "GET",
    url: "https://weatherapi-com.p.rapidapi.com/current.json",
    params: { q: '53.1,-0.13' },
    headers: {
      'X-RapidAPI-Key': 'ec30b4ec4amshcd74cf448cf3e13p10cfeajsndaa0e47b272b',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data)
  } catch (error) {
    console.error(error);
  }
};
