import movies from './movies.json';

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
