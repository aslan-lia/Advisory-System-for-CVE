import express, { Request, Response } from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;
const NVD_API_KEY = process.env.NVD_API_KEY;

app.use(cors());
app.use(express.json());

// Fetch CPE Data from NVD
app.get('/api/cpe', async (req: Request, res: Response) => {
  const { cpeMatchString, startDate, endDate } = req.query;

  // Construct URL with optional parameters
  const nvdUrl = `https://services.nvd.nist.gov/rest/json/cpes/2.0`;

  try {
    const params: any = {
      cpeMatchString,
      resultsPerPage: 20,
      apiKey: NVD_API_KEY,
    };

    if (startDate && endDate) {
      params.lastModStartDate = new Date(startDate as string).toISOString();
      params.lastModEndDate = new Date(endDate as string).toISOString();
    }

    const response = await axios.get(nvdUrl, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching CPE data:', error);
    res.status(500).json({ error: 'Failed to fetch CPE data' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
