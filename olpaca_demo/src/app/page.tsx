"use client";
import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import Head from "next/head";

import { getWeatherProps } from "./api/WeatherData";
import { testModelAPI } from "./api/Bedrock";
//import { initMap } from "./api/GoogleMap";
import apiJS from "./js/api.js";
import { Loader } from "@googlemaps/js-api-loader";
import FilterMenu from "./components/MapMenu";

// function calculateAndDisplayRoute(
//   directionsService: google.maps.DirectionsService,
//   directionsDisplay: google.maps.DirectionsRenderer,
//   pointA: google.maps.LatLng,
//   pointB: google.maps.LatLng,
// ) {
//   directionsService.route(
//     {
//       origin: pointA,
//       destination: pointB,
//       avoidTolls: true,
//       avoidHightways: false,
//       travelMode: google.maps.TravelMode.DRIVING,
//     },
//     function (response, status) {
//       if (status == google.maps.DirectionsStatus.OK) {
//         directionsDisplay.setDirections(response);
//       } else {
//         window.alert("Directions request failed due to " + status);
//       }
//     },
//   );
// }
// function initMap() {
//   let pointA = new google.maps.LatLng(-37.79, 144.92),
//   pointB = new google.maps.LatLng(-37.82, 144.97),
//   myOptions = {
//     zoom: 7,
//     center: pointA,
//   },
//   map = new google.maps.Map(document.getElementById("map") as HTMLElement, myOptions),
//   directionsService = new google.maps.DirectionsService(),
//   directionsDisplay = new google.maps.DirectionsRenderer({
//     map: map
//   }),
//   markerA = new google.maps.Marker({
//     position: pointA,
//     title: "point A",
//     label: "A",
//     map: map
//   }),
//   markerB = new google.maps.Marker({
//     position: pointB,
//     title: "point B",
//     label: "B",
//     map: map
//   });
//
//   calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);
// }
//
export default function Home() {
  const [inputTemp, setTemp] = useState("");
  const [inputFit, setFit] = useState("");
  const [inputLat, setLat] = useState("");
  const [inputLong, setLong] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedDestination, setSelectedDestination] = useState('Current Destination');
  const [selectedDepartDateTime, setSelectedDepartDateTime] = useState('Now');
  const [selectedAvoidOptions, setSelectedAvoidOptions] = useState<string[]>([]);

  const handleApplyFilters = (destination: string, departDateTime: string, avoidOptions: string[]) => {
    setSelectedDestination(destination);
    setSelectedDepartDateTime(departDateTime);
    setSelectedAvoidOptions(avoidOptions);
    // update map data
  };

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTemp(event.target.value);
  };

  const handleFitChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFit(event.target.value);
  };

  const handleLatChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLat(event.target.value);
  };

  const handleLongChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLong(event.target.value);
  };

  const handleGenerateOutput = () => {
    setOutputText("This should be the generated output");
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const { get_route } = apiJS();

  // @ts-ignore google.maps.plugins
  const loader = new Loader({
    apiKey: process.env.GOOGLE_MAPS_API_KEY ?? "",
    version: "weekly",
  });

  let map;
  loader.load().then(async () => {
    const { Map } = (await google.maps.importLibrary(
      "maps",
    )) as google.maps.MapsLibrary;

    // Yuki's testing
    var origin = "New York, NY"
    var destination = "Los Angeles, CA"
    
    // Function for running the google maps api
    get_route(origin, destination);

    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -37.804874, lng: 144.96259 },
      zoom: 14,
    });
  });

  // initMap();

  return (
    <div>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`}
          async
          defer
        />
      </Head>
      <main>
        <h1
          className="animate-in mb-4 text-xl font-extrabold md:text-2xl lg:text-3xl"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          SmartWear Adviser: Your Personalised Weather Wardrobe Companion
        </h1>
        <p
          className="animate-in text-sm font-normal lg:text-md"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          (placeholder) Stay ahead of the weather with SmartWear Adviser, the
          revolutionary generative AI app designed to make your daily clothing
          choices a breeze. This intelligent application goes beyond generic
          weather forecasts, taking into account your individual preferences,
          daily activities, and metabolism to offer tailor-made clothing
          recommendations.
        </p>
        <hr className="h-px my-8 bg-secondary border-0" />
        <div className="relative">
          <div
            className="animate-in flex flex-row justify-center w-full h-[500px]"
            style={{ "--index": 3 } as React.CSSProperties}
            id="map"
          >
          </div>
          <FilterMenu onSelect={handleApplyFilters} />
          <p>Text output preview:</p>
          <p>Selected Destination: {selectedDestination}</p>
          <p>Selected Departure: {selectedDepartDateTime}</p>
          <p>Selected Avoid Options: {selectedAvoidOptions.join(' ')}</p>
        </div>

        <div
          className="animate-in flex flex-col md:flex-row md:divide-x mt-8"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <div className="flex flex-col px-8 w-[500px] gap-y-4">
            <div className="container flex flex-col mx-auto mb-4">
              <label
                htmlFor="temperature"
                className="text-lg font-semibold mb-2"
              >
                Temperature
              </label>
              <textarea
                id="temperature"
                className="border border-primary rounded-lg p-2 h-11 resize-none"
                value={inputTemp}
                onChange={handleTemperatureChange}
                placeholder="Enter temperature here..."
              />
            </div>

            <div className="container flex flex-col mx-auto mb-4">
              <label htmlFor="fit" className="text-lg font-semibold mb-2">
                Fit
              </label>
              <textarea
                id="fit"
                className="border border-primary rounded-lg p-2 h-11 resize-none"
                value={inputFit}
                onChange={handleFitChange}
                placeholder="Enter what you're wearing here..."
              />
            </div>

            <div className="container flex flex-col mx-auto mb-4">
              <label htmlFor="latitude" className="text-lg font-semibold mb-2">
                Latitude
              </label>
              <textarea
                id="latitude"
                className="border border-primary rounded-lg p-2 h-11 resize-none"
                value={inputLat}
                onChange={handleLatChange}
                placeholder="Enter latitude"
              />
            </div>

            <div className="container flex flex-col mx-auto mb-4">
              <label htmlFor="longitude" className="text-lg font-semibold mb-2">
                Longitude
              </label>
              <textarea
                id="longitude"
                className="border border-primary rounded-lg p-2 h-11 resize-none"
                value={inputLong}
                onChange={handleLongChange}
                placeholder="Enter longitude"
              />
            </div>
          </div>

          <div className="flex flex-col px-8 w-[500px] container">
            <label
              htmlFor="recommendations"
              className="text-lg font-semibold mb-2"
            >
              Clothing Recommendations
            </label>
            <textarea
              id="recommendations"
              className="border border-primary rounded-lg p-2 h-36 resize-none"
              value={outputText}
              placeholder="Output will be generated here..."
              readOnly
            />
            <button
              className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded"
              onClick={handleGenerateOutput}
            >
              Generate Output
            </button>
          </div>
        </div>

        <div
          className="animate-in flex flex-row justify-center mt-4"
          style={{ "--index": 4 } as React.CSSProperties}
        >
          <button
            className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded"
            onClick={getWeatherProps("-37.804874", "144.96259")}
          >
            Get Weather Data
          </button>
          <button
            className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded"
            onClick={testModelAPI}
          >
            Ping Model API
          </button>
        </div>

        <div className="mt-4 w-full py-24 flex flex-col stretch border border-primary p-2">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}

          <form onSubmit={handleSubmit}>
            <label>
              Say something...
              <input
                className="w-full max-w-md bottom-0 border border-primary rounded mb-8 shadow-lg p-2"
                value={input}
                onChange={handleInputChange}
              />
            </label>
            <button
              className="border broder-primary shadow-lg p-2"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
