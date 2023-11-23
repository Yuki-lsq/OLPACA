import { Loader } from "@googlemaps/js-api-loader";

async function get_route(origin, destination, mode="driving") {
    const baseUrl = "https://maps.googleapis.com/maps/api/directions/json"
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY

    // define the parameters
    // https://developers.google.com/maps/documentation/javascript/directions
    var params = {
        "origin": origin,
        "destination": destination,
        "mode": mode,
        "key": GOOGLE_MAPS_API_KEY
    }

    var config = {
      params: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      }
    }

    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY ?? "",
      version: "weekly",
    });

    loader.load().then(async () => {
      const axios = require("axios")
      try {
        const response = await axios.get(baseUrl, config)
        console.log(response);
        return response
        // return response.data;
      } catch (error) {
        console.error(error);
      }
    });
}

export default () => {
  return {get_route}
}

// def get_route(api_key, origin, destination, mode="driving"):
//     base_url = "https://maps.googleapis.com/maps/api/directions/json"

//     response = requests.get(base_url, params=params)
//     data = response.json()
//     #print(data)

//     #check data status
//     if data["status"] == "OK":
//         #extract route
//         route = data["routes"][0]["legs"][0]["steps"]

//         #create map
//         route_map = folium.Map(location=[data["routes"][0]["legs"][0]["start_location"]["lat"], data["routes"][0]["legs"][0]["start_location"]["lng"]], zoom_start=10)

//         for step in route:
//             #each step: add maker
//             start_location = [step["start_location"]["lat"], step["start_location"]["lng"]]
//             end_location = [step["end_location"]["lat"], step["end_location"]["lng"]]

//             folium.Marker(location=start_location, popup=step["html_instructions"]).add_to(route_map)
//             folium.Marker(location=end_location).add_to(route_map)

//             #plot the line
//             folium.PolyLine([start_location, end_location], color="blue").add_to(route_map)

//         #save the html file
//         route_map.save("route_map.html")

//     else:
//         print("Error:", data["status"])
