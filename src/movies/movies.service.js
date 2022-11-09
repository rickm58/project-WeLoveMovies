const knex = require("../db/connection")

function list(){
    return knex("movies").select("*")
}

function listShowing(){
    return knex("movies as m")
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where("mt.is_showing", true)
    .groupBy("m.movie_id")
}

function read(movieId){
    return knex("movies").select("*").where({ "movie_id": movieId }).first()
}


function readMoviesAndTheaters(movie_id){
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "mt.movie_id")
    .where({"mt.movie_id": movie_id})
    .where({"mt.is_showing" : true })
    .groupBy("t.theater_id", "mt.is_showing", "mt.movie_id")
}

module.exports = {
    list,
    listShowing,
    read,
    readMoviesAndTheaters
}