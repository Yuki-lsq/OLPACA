import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch data
    const data = await fetchDataFromRoutesAPI();

    // Return data
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error fetching Routes API data:", error);
    res.status(500).json({ error: "Unable to fetch Routes API data" });
  }
}

async function fetchDataFromRoutesAPI() {

}
