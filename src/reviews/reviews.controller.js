const reviewsService = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundaries")
const knex = require("../db/connection")

async function list(req, res, next){
    const { movieId } = req.params
    const reviews = await reviewsService.readMoviesAndReviews(movieId)
    res.json({ data: reviews.filter(movieId ? review => review.movie_id == movieId : () => true) })
}

function reviewExists(req, res, next){
        reviewsService
        .read(req.params.reviewId)
        .then((review)=>{
            if(review){
                res.locals.review = review
                return next()
            }
            next({ status: 404, message: "Review cannot be found." })
        })
        .catch(next)
    }

function read(req, res, next) {
    res.json({ data: res.locals.review });
};

async function update(req, res, next){
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    
    await reviewsService.update(updatedReview)
    const responseData = await reviewsService.read(req.params.reviewId)
    responseData["critic"] = await reviewsService.readCritic(responseData.critic_id)
    res.json({ data:responseData })
}

function destroy(req, res, next){
    reviewsService.destroy(res.locals.review.review_id)
    .then(()=>res.sendStatus(204))
    .catch(next)
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}