"use client";
import { useState } from "react";
import { useChat } from "ai/react";
import Head from "next/head";
import { Loader } from "@googlemaps/js-api-loader";
import { PromptTemplate } from "langchain/prompts";
import { RunnableSequence } from "langchain/schema/runnable";

import { fetchNewTemperature } from "./api/WeatherData";
import { templateBuilder, llmCommand, parser } from "./utils/llm";
import FilterMenu from "./components/MapMenu";

export default function Home() {
  const [inputTemp, setTemp] = useState("");
  const [inputLat, setLat] = useState("");
  const [inputLong, setLong] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDepartDateTime, setSelectedDepartDateTime] = useState("Now");
  const [selectedAvoidOptions, setSelectedAvoidOptions] = useState<string[]>(
    [],
  );
  const temporary_lat = "-37.804874";
  const temporary_long = "144.96259";
  const [temperatures, setTemperatures] = useState<string[]>([]);

  const handleApplyFilters = (
    destination: string,
    departDateTime: string,
    avoidOptions: string[],
  ) => {
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

  const handleGetWeatherData = () => {
    fetchNewTemperature("-37.804874", "144.96259");
  };

  const handleGenerateOutput = async () => {
    try {
      const locations = [
        "Parkville, Melbourne, Australia",
        "Docklands, Melbourne",
      ];
      const temperatures = ["29", "29"];

      const locationDict: Record<string, string> = {};
      const temperatureDict: Record<string, string> = {};
      locations.forEach((location, index) => {
        locationDict[`location${index}`] = location;
      });
      temperatures.forEach((temperature, index) => {
        temperatureDict[`temperature${index}`] = temperature;
      });
      const inputValues: Record<string, string> = {
        ...locationDict,
        ...temperatureDict,
        style: "casual",
        sex: "female",
      };
      const template = templateBuilder(locations.length);

      const prompt = PromptTemplate.fromTemplate(template);

      const chain = RunnableSequence.from([prompt, llmCommand, parser]);

      const response = await chain.invoke({
        ...inputValues,
        format_instructions: parser.getFormatInstructions(),
      });

      const { weatherSummary, clothesRecommendation } = response;
      const outputText = `Weather Summary: ${weatherSummary}\n\nClothes Recommendation: ${clothesRecommendation}`;
      setOutputText(outputText);
      console.log(typeof response);
    } catch (error) {
      console.log(error);
    }
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat();

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
    const origin = "New York, NY";
    const destination = "Los Angeles, CA";
    const mode = "driving";

    // Function for running the google maps api
    map = new Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -37.804874, lng: 144.96259 },
      zoom: 14,
    });
  });

  return (
    <div>
      <Head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap`}
          async
          defer
        />
        {/* <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&libraries=places`}
          type="text/javascript"
        /> */}
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
          ></div>
          <FilterMenu onApply={handleApplyFilters} />
          <p>Text output preview:</p>
          <p>Selected Destination: {selectedDestination}</p>
          <p>Selected Departure: {selectedDepartDateTime}</p>
          <p>Selected Avoid Options: {selectedAvoidOptions.join(" ")}</p>
        </div>

        <div
          className="animate-in flex flex-col md:flex-row mt-8"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <div className="flex flex-col w-full container">
            <label
              htmlFor="recommendations"
              className="text-lg font-semibold mb-2"
            >
              Clothing Recommendations
            </label>
            <textarea
              id="recommendations"
              className="border border-primary rounded-lg p-2 h-full resize-none"
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
            onClick={handleGetWeatherData}
          >
            Get Weather Data
          </button>
        </div>

        {/*
        <div className="mt-4 w-full py-24 flex flex-col border border-primary p-2 rounded-lg">
          {messages.map((m) => (
            <div key={m.id}>
              {m.role === "user" ? "User: " : "AI: "}
              {m.content}
            </div>
          ))}

          <form className="flex flex-col" onSubmit={handleSubmit}>
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
        */}
      </main>
    </div>
  );
}
