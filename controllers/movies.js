const movies = require('../movies')

const getAllMovies = (request, response) => {
  return response.send(movies)
}

const getPartialMovieMatch = (request, response) => {
  const { input } = request.params

  const matchingMovies = movies.filter(movie => {
    const stringToPartialMatchTo = (movie.directors.concat(movie.title)).join().toLowerCase()

    return stringToPartialMatchTo.includes(input.toLowerCase())
  })

  // movie.title.toLowerCase().includes(input.toLowerCase()) ||
  // movie.directors.join().toLowerCase().includes(input.toLowerCase()))

  return matchingMovies.length
    ? response.send(matchingMovies)
    : response.sendStatus(404)
}

const saveNewMovie = (request, response) => {
  const {
    title, directors, releaseDate, rating, runTime, genres
  } = request.body

  if (!title || !directors || !releaseDate || !rating || !runTime || !genres) {
    return response
      .status(400)
      .send('The following fields are required: title, directors, releaseDate, rating, runTime, genres')
  }

  const newMovie = {
    title, directors, releaseDate, rating, runTime, genres
  }

  movies.push(newMovie)

  return response.status(201).send(newMovie)
}

module.exports = { getAllMovies, getPartialMovieMatch, saveNewMovie }
