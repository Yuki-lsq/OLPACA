import { SageMakerRuntime } from "@aws-sdk/client-sagemaker-runtime";
import { Parser } from "@json2csv/plainjs";

export const runInference = async (data) => {
  const runtime = new SageMakerRuntime({
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "",
    },
    region: "us-east-1",
  });
  const endpointName = "XGBoostEndpoint-2023-11-25-10-31-37";
  const fields = [
    "mintemp_c",
    "maxtemp_c",
    "precip_mm",
    "sunshine",
    "gust_kph",
    "daily_will_it_rain",
    "tom_will_it_rain",
    "wind_kph",
    "humidity",
    "pressure_md",
    "cloud",
    "temp_c",
    "PersonID",
    "sex",
    "age",
    "height",
    "weight",
    "BMI",
    "freqOfExercise",
    "CI",
  ];
  const fieldNames = [
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
    "number",
  ];
  //const jsonData<string> = JSON.stringify(data);
  // const csvData = json2csv({ data:data, fields:fields, fieldNames:fieldNames });
  const parser = new Parser();
  const csv = parser.parse(data);

  //const headers = Object.keys(sonData.data[0]).toString();
  // const main = jsonData.data.map((item) => {
  //   return Object.values(item).toString();
  // });
  // const csv = [headers, ...main].join("\n");
  

  var vals = new Array<Number>();
  var string = "17,20,0.14,12.3,18,0,0,12.2,93,1006.3,100,15.4,1,0,20,175,28,28.39,6,2.30714363".split(",")
  for (var i = 0; i < string.length; i++) {
    vals.push(string[i])
  }

  
  const params = {
    Body: vals,
    EndpointName: endpointName,
    ContentType: "text/csv",
  };

  try {
    console.log(vals);
    const response = await runtime.invokeEndpoint(params);
    const result = response.Body.toString();
    // console.log("Prediction Result:", result);
    return result;
  } catch (error) {
    console.error("Error invoking SageMaker endpoint:", error);
    throw error;
  }
};
