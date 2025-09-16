import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const moviesFilePath = path.join(__dirname, 'movies.json');
const movies = JSON.parse(readFileSync(moviesFilePath, 'utf8'));

export default function handler(req, res) {
  let data = movies;
  const { search } = req.query;

  if (search) {
    data = movies.filter(movie =>
      movie.Title.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  res.status(200).json({ Search: data });
}
