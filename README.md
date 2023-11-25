# OLPACA

Step into style with Wearther, your ultimate travel companion in the world of fashion. Unleash the power of personalised outfit recommendations based on real-time weather conditions and your unique preferences. Beyond just forecasting the weather, Wearther curates the perfect wardrobe for your journey, ensuring you stay comfortable and chic no matter where your adventures take you. Seamlessly blending fashion and functionality, this innovative app transforms your daily clothing decisions into a delightful experience.

<p align="center">
    <img src="image/Website Screenshot.png" alt="Website Screenshot" width="600">
 </p>

## Getting Started

1. First, clone the repository to access all available files and install all the dependencies:
    ```
    git clone https://github.com/victorwkb/OLPACA.git
    cd olpaca_demo
    npm install 
    ```

2. Retrieve free API Keys from the following places:
    -  [Amazon Web Services](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html) - for accessing the model endpoint on SageMaker and connecting to the Cohere Command LLM model on BedRock
    - [Google Maps Platform](https://developers.google.com/maps/documentation/javascript/get-api-key) - for accessing Google Maps
    - [Weather API](https://rapidapi.com/weatherapi/api/weatherapi-com?fbclid=IwAR0_sKXGpKDDypw-OpITXU_jeCFDlpy1r0EkWlBga5eJjOdcZU5K1IyETdM) - for accessing WeatherAPI hosted on RapidAPI

3. Copy `.env.example` to a new `.env.local` and fill in your API keys to set up the related environment.

4. Run the development server:

    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
