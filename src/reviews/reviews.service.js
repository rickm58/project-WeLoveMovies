const { select } = require("../db/connection")
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function list(){
    return knex("reviews").select("*")
}

function read(review_id){
    return knex("reviews")
    .select("*")
    .where({ review_id })
    .first()
}

const addCritic = mapProperties({
    "c:critic_id": "critic.critic_id",
    "c:preferred_name": "critic.preferred_name",
    "c:surname": "critic.surname",
    "c:organization_name": "critic.organization_name",
    "c:created_at": "critic.created_at",
    "c:updated_at": "critic.updated_at"
})

function readMoviesAndReviews(movie_id){
    return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*",
    "c.critic_id as c:critic_id",
    "c.preferred_name as c:preferred_name",
    "c.surname as c:surname",
    "c.organization_name as c:organization_name",
    "c.created_at as c:created_at",
    "c.updated_at as c:updated_at",)
    .where({ "r.movie_id": movie_id})
    .then((reviews)=>reviews.map((review)=>addCritic(review)))
}

async function update(updatedReview){
    return knex("reviews as r")
    .select("*")
    .where({ "review_id": updatedReview.review_id })
    .update(updatedReview, "*")
}

async function readCritic(critic_id){
    return knex("critics")
    .select("*")
    .where({ "critic_id": critic_id })
    .first()
}

function destroy(review_id){
    return knex("reviews").where({ review_id }).del()
}

module.exports = {
    list,
    read,
    readCritic,
    readMoviesAndReviews,
    update,
    destroy
}