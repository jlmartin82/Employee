const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Provide your MySQL password
  database: 'Employee_db',
});

// Check the database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
  } else {
    console.log('Connected to the movies_db database.');
  }
});

// Routes

// Retrieve all movies and their reviews
app.get('/api/movies', (req, res) => {
  const sql = `
    SELECT movies.id, movies.name, reviews.review
    FROM movies
    LEFT JOIN reviews ON movies.id = reviews.movie_id
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving movies: ', err);
      res.status(500).json({ error: 'Failed to retrieve movies.' });
    } else {
      res.json(results);
    }
  });
});

// Add a new movie
app.post('/api/add-movie', (req, res) => {
  const { name } = req.body;

  const sql = 'INSERT INTO movies (name) VALUES (?)';
  const values = [name];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error adding movie: ', err);
      res.status(500).json({ error: 'Failed to add movie.' });
    } else {
      const movie = { id: result.insertId, name };
      res.status(201).json(movie);
    }
  });
});

// Update a movie's review
app.put('/api/update-review/:id', (req, res) => {
  const { id } = req.params;
  const { review } = req.body;

  const sql = 'UPDATE reviews SET review = ? WHERE movie_id = ?';
  const values = [review, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating review: ', err);
      res.status(500).json({ error: 'Failed to update review.' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Delete a movie
app.delete('/api/movie/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM movies WHERE id = ?';
  const values = [id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error deleting movie: ', err);
      res.status(500).json({ error: 'Failed to delete movie.' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Movie not found.' });
    } else {
      res.sendStatus(204);
    }
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
