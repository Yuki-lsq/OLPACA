import { Bedrock } from "langchain/llms/bedrock/web";

export async function testModelAPI() {
  const model = new Bedrock({
    model: "ai21.j2-ultra-v1",
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ""
    },
    modelKwargs: {},
  });
  const res = await model.invoke("Tell me a joke");
  console.log(res);
};
