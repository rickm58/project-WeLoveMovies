const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")
const reduceProperties = require("../utils/reduce-properties");


const reduceMovies = reduceProperties("theater_id", {
  "m:movie_id": ["movies", null, "movie_id"],
  "m:title": ["movies", null, "title"],
  "m:rating": ["movies", null, "rating"],
  "m:runtime_in_minutes": ["movies", null, "runtime_in_minutes"],
  "m:description": ["movies", null, "description"],
  "m:image_url": ["movies", null, "image_url"],
  "m:created_at": ["movies", null, "created_at"],
  "m:updated_at": ["movies", null, "updated_at"],
  "mt:is_showing": ["movies", null, "is_showing"],
  "mt:theater_id": ["movies", null, "theater_id"]
});



function listTheaters(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .groupBy("t.theater_id", "mt.movie_id", "mt.is_showing")
    .then((data)=>reduceMovies(data))
}

function listMoviesAndTheaters(){
    return knex("movies_theaters").select("*")
}

const addMovie = mapProperties({
    "m:critic_id": "movie.critic_id",
    "m:title": "movie.title",
    "m:runtime_in_minutes": "movie.runtime_in_minutes",
    "m:rating": "movie.rating",
    "m:description": "movie.description",
    "m:image_url": "movie.image_url",
    "m:created_at": "movie.created_at",
    "m:updated_at": "movie.updated_at",
    "mt:is_showing": "movie.is_showing",
    "mt:theater_id": "movie.theater_id"
})

function readMoviesAndTheaters(){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*",
    "m.movie_id as m:movie_id",
    "m.title as m:title",
    "m.runtime_in_minutes as m:runtime_in_minutes",
    "m.rating as m:rating",
    "m.description as m:description",
    "m.image_url as m:image_url",
    "m.created_at as m:created_at",
    "m.updated_at as m:updated_at",
    "mt.is_showing as mt:is_showing",
    "mt.theater_id as mt:theater_id",
    )
    .then((theaters)=>reduceMovies(theaters))
}


module.exports = {
    listTheaters,
    listMoviesAndTheaters,
    readMoviesAndTheaters
}