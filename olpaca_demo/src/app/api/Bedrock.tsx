import { Bedrock } from "langchain/llms/bedrock/web";

export async function llmCommand() {
  const model = new Bedrock({
    model: "cohere.command-text-v14",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY ?? ""
    },
    modelKwargs: {
      max_tokens: 200
    },
  });
  return model;
};
