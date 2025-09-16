// server/index.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 9000;

// Чтение JSON файла
const getMoviesData = () => {
  const data = fs.readFileSync('./movies.json', 'utf8');
  return JSON.parse(data);
};

app.get('/api/movies', (req, res) => {
  const { search } = req.query;
  let movies = getMoviesData();

  if (search) {
    // Фильтрация по первой букве
    movies = movies.filter(movie => movie.Title.toLowerCase().startsWith(search.toLowerCase()));
  }

  res.json({ Search: movies });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
