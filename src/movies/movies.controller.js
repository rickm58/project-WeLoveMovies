const moviesService = require("./movies.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")

async function list(req, res, next){
    const is_showing = req.query.is_showing
    if (is_showing){
        return next()
    }
    const data = await moviesService.list()
    res.json({ data })
}

async function listShowing(req, res, next){
    res.json({ data: await moviesService.listShowing() })
}

function movieExists(req, res, next){
    moviesService
    .read(req.params.movieId)
    .then((movie)=>{
        if(movie){
            res.locals.movie = movie
            return next()
        }
        next({ status: 404, message: `Movie cannot be found!`})
    })
    .catch(next)
}

function read(req, res){
    res.json({ data: res.locals.movie})
}

async function readMoviesAndTheaters(req, res, next){
    const { movieId } = req.params
    res.json({ data: await moviesService.readMoviesAndTheaters(Number(movieId))})
  
}

module.exports = {
    movieExists,
    list: [asyncErrorBoundary(list), asyncErrorBoundary(listShowing)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    readMoviesAndTheaters
    
}