const express = require('express')
const { getAllMovies, getPartialMovieMatch, saveNewMovie } = require('./controllers/movies')
const bodyParser = require('body-parser')

const app = express()

app.get('/movies', getAllMovies)

app.get('/movies/:input', getPartialMovieMatch)

app.post('/movies', bodyParser.json(), saveNewMovie)

app.all('*', (request, response) => {
  return response.status(404).send('What we\'ve got here is a failure to communicate.')
})

app.listen(1337, () => {
  console.log('Zed\'s dead baby, Zed\'s dead') // eslint-disable-line no-console
})
