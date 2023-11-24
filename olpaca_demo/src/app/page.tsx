"use client";
import { useState } from "react";
import { useChat } from "ai/react";
import Head from "next/head";
import { Loader } from "@googlemaps/js-api-loader";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { RunnableSequence } from "langchain/schema/runnable";
import { llmCommand } from "./api/Bedrock";

import getWeatherProps from "./api/WeatherData";
import { templateBuilder } from "./api/llm-command";
import FilterMenu from "./components/MapMenu";

export default function Home() {
  const [inputTemp, setTemp] = useState("");
  const [inputFit, setFit] = useState("");
  const [inputLat, setLat] = useState("");
  const [inputLong, setLong] = useState("");
  const [outputText, setOutputText] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedDepartDateTime, setSelectedDepartDateTime] = useState("Now");
  const [selectedAvoidOptions, setSelectedAvoidOptions] = useState<string[]>(
    [],
  );

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
    getWeatherProps("-37.804874", "144.96259");
  };

  const handleGenerateOutput = async () => {
    const locations = ['Parkville, Melbourne, Australia', 'Docklands, Melbourne'];
    const temperatures = ['29', '29'];
    const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
      weatherSummary: "summary of weather",
      clothesRecommendation: "clothes recommendation for the human based on weather",
    });

    const locationDict: Record<string, string> = {};
    const temperatureDict: Record<string, string> = {};
    locations.forEach((location, index) => {
      locationDict[`location${index}`] = location;
    });
    temperatures.forEach((temperature, index) => {
      temperatureDict[`temperature${index}`] = temperature;
    });
    const inputVars: Record<string, string> = { ...locationDict, ...temperatureDict };
    try {
      // Create the final prompt here using the templateBuilder function

      const builtTemplate = templateBuilder(locations);
      // const prompt = PromptTemplate.fromTemplate({
      //   template: builtTemplate,
      //   partialVariables: {
      //     format_instructions: outputParser.getFormatInstructions(),
      //   },
      // });
      const prompt = PromptTemplate.fromTemplate(
        builtTemplate
      )

      const chain = RunnableSequence.from([
        prompt,
        llmCommand,
        outputParser,
      ]);

      const response = await chain.invoke({
        ...inputVars,
        format_instructions: outputParser.getFormatInstructions(),
      });
      console.log(response);
      // Invoke the model with the final parsed prompt
      // const response = await chain.invoke({** inputValues});
      // setOutputText(response);
    } catch (error) {
      console.log(error);
    };
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
            onClick={handleGetWeatherData}
          >
            Get Weather Data
          </button>
          {/*
          <button
            className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded"
            onClick={llmCommand}
          >
            Ping Model API
          </button>
          */}
        </div>

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

      </main>
    </div>
  );
}
