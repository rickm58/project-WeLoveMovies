const theatersService = require("./theaters.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")
const reduceProperties = require("../utils/reduce-properties");


async function list(req, res, next){
    const { movieId } = req.params
    const theaters = await theatersService.listTheaters()
    const readMoviesAndTheaters = await theatersService.readMoviesAndTheaters()

    movieId ? res.json({ data: theaters.filter(theater => theater.movie_id == movieId )}) :  res.json({ data: readMoviesAndTheaters })
}

module.exports = {
    list: [asyncErrorBoundary(list)],
}