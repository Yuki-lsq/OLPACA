"use client";
import { useState } from "react";
import { useChat } from "ai/react";

import { getWeatherProps } from "./api/WeatherData";

export default function Home() {
  const [inputTemp, setTemp] = useState("");
  const [inputFit, setFit] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleTemperatureChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setTemp(event.target.value);
  };

  const handleFitChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFit(event.target.value);
  };

  const handleGenerateOutput = () => {
    setOutputText("This should be the generated output");
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <main>
      <h1
        className="animate-in mb-4 text-2xl font-extrabold md:text-3xl lg:text-4xl"
        style={{ "--index": 1 } as React.CSSProperties}
      >
        SmartWear Adviser: Your Personalised Weather Wardrobe Companion
      </h1>
      <p
        className="animate-in text-md font-normal lg:text-lg"
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
      <div
        className="animate-in flex flex-row divide-x"
        style={{ "--index": 3 } as React.CSSProperties}
      >
        <div className="flex flex-col px-8 w-[500px] gap-y-4">
          <div className="container flex flex-col mx-auto mb-4">
            <label htmlFor="temperature" className="text-lg font-semibold mb-2">
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
        className="animate-in flex flex-row justify-center mt-8"
        style={{ "--index": 4 } as React.CSSProperties}
      >
        <button
          className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded"
          onClick={getWeatherProps}
        >
          Get Weather Data
        </button>
        <button className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-primary rounded">
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
          <button className="border broder-primary shadow-lg p-2" type="submit">Send</button>
        </form>
      </div>
    </main>
  );
}
