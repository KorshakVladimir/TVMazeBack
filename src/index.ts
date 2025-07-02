import express, { Request, Response } from 'express';
import axios from "axios";
import cors from 'cors';
const app = express()
const port = 4000

app.use(cors());

interface Show {
  id: number;
  name: string;
  genres: string[];
  summary?: string;
  image?: {
    medium: string;
    original: string;
  };
  language?: string;
  premiered?: string;
  [key: string]: any;
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.get('/api/search', async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ error: 'Query parameter q is required' });
    return;
  }

  try {
    const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`);
    const shows: Show[] = response.data.map((item: any) => item.show);
    res.json(shows);
  } catch (error) {
    console.error('TVMaze API error:', error);
    res.status(500).json({ error: 'Failed to fetch from TVMaze API' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
