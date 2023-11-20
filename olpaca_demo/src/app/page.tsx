"use client";
import { useState } from "react";

export default function Home() {
  const [inputTemp, setTemp] = useState("");
  const [inputFit, setFit] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleTemperatureChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemp(event.target.value);
  };

  const handleFitChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFit(event.target.value);
  };

  const handleGenerateOutput = () => {
    setOutputText("generated llm output");
  };

  return (
    <main>
      <h1 className="mb-4 text-2xl font-extrabold md:text-3xl lg:text-4xl">
        SmartWear Adviser: Your Personalised Weather Wardrobe Companion
      </h1>
      <p className="text-md font-normal lg:text-lg">
        (placeholder) Stay ahead of the weather with SmartWear Adviser, the
        revolutionary generative AI app designed to make your daily clothing
        choices a breeze. This intelligent application goes beyond generic
        weather forecasts, taking into account your individual preferences,
        daily activities, and metabolism to offer tailor-made clothing
        recommendations.
      </p>
      <hr className="h-px my-8 bg-gray-300 border-0" />
      <div className="flex flex-row divide-x">
        <div className="flex flex-col px-8 w-[500px] gap-y-4">
          <div className="container flex flex-col mx-auto mb-4">
            <label htmlFor="temperature" className="text-lg font-semibold mb-2">
              Temperature
            </label>
            <textarea
              id="temperature"
              className="border border-gray-300 rounded-lg p-2 h-12 resize-none"
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
              className="border border-gray-300 rounded-lg p-2 h-12 resize-none"
              value={inputFit}
              onChange={handleFitChange}
              placeholder="Enter what you're wearing here..."
            />
          </div>
        </div>

        <div className="flex flex-col px-8 w-[500px] container">
          <label className="text-lg font-semibold mb-2">
            Clothing Recommendations
          </label>
          <textarea
            className="border border-gray-300 rounded-lg p-2 h-36 resize-none"
            value={outputText}
            placeholder="Output will be generated here..."
            readOnly
          />
          <button
            className="mt-4 bg-secondary hover:bg-tertiary font-bold py-2 px-4 border border-gray-300 rounded"
            onClick={handleGenerateOutput}
          >
            Generate Output
          </button>
        </div>
      </div>
    </main>
  );
}
