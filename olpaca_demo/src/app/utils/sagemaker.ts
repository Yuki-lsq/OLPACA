import AWS from "aws-sdk";

export const runInference = async (data) => {
  const runtime = new AWS.SageMakerRuntime();
  const endpointName = "XGBoostEndpoint-2023-11-25-04-33-41";
  const params = {
    Body: JSON.stringify(data),
    EndpointName: endpointName,
    ContentType: "application/json",
  };

  try {
    const response = await runtime.invokeEndpoint(params).promise();
    const result = JSON.parse(response.Body.toString("utf-8"));
    console.log("Prediction Result:", result);
    return result;
  } catch (error) {
    console.error("Error invoking SageMaker endpoint:", error);
    throw error;
  }
};
