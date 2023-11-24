import { Bedrock } from "langchain/llms/bedrock/web";
import { StructuredOutputParser } from "langchain/output_parsers";

export const LOC = "location";
export const TEMP = "temperature";

export const llmCommand = new Bedrock({
  model: "cohere.command-text-v14",
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
  },
  modelKwargs: {
    max_tokens: 200,
  },
});

export const parser = StructuredOutputParser.fromNamesAndDescriptions({
  weatherSummary: "summary of weather",
  clothesRecommendation:
    "clothes recommendation for the human based on weather",
});

export const varNameBuilder = (name: string, numLocation: number): string => {
  return `${name}${numLocation}`;
};

export const templateBuilder = (numData: number): string => {
  const description =
    "\n\nHuman: You are an AI advisor summarizing and recommending what a human (me) travelling between these location should wear depending on the weather and sex. Assume humans\
  cannot change outfits but can bring reasonable outerwears.";
  const formatInstructions = "\n\n{format_instructions}";
  const humanRequestTitle = "\n\nHere is the human's request:\n\n";

  let inputTemplate = "";
  for (let i = 0; i < numData; i++) {
    const locName = varNameBuilder(LOC, i);
    const tempName = varNameBuilder(TEMP, i);
    inputTemplate += `${locName}: {${locName}}\n${tempName}: {${tempName}}\n`;
  }

  inputTemplate += "Style: {style}\n";
  inputTemplate += "Sex: {sex}\n";

  const humanRequestEnder = "\n</human_reply>";
  const assistantStart = "\n\nAssistant:";

  const prompt =
    description +
    formatInstructions +
    humanRequestTitle +
    inputTemplate +
    humanRequestEnder +
    assistantStart;

  return prompt;
};
