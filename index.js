import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const moviesFilePath = path.join(__dirname, 'movies.json');
const movies = JSON.parse(readFileSync(moviesFilePath, 'utf8'));

const app = express();
app.use(cors());
app.use(express.json());

app.get('/movies', (req, res) => {
  const { search } = req.query;
  let data = movies;
  if (typeof search === 'string' && search.trim().length > 0) {
    const q = search.toLowerCase();
    data = movies.filter(movie =>
      typeof movie.Title === 'string' && movie.Title.toLowerCase().startsWith(q)
    );
  }
  res.status(200).json({ Search: data });
});

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
