if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors())
app.use(express.json())
const notFound = require("./errors/notFound")
const errorHandler = require("./errors/errorHandler")


const moviesRouter = require("./movies/movies.router")
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")

const router = express.Router()
router.get('/', cors(), (req, res) => {
    res.json({ message:
    'Welcome! You can access the data using these routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId/theaters, and /movies/:movieId/reviews.'});
})

app.use('/', router)

app.use("/movies", moviesRouter)
app.use("/theaters", theatersRouter)
app.use("/reviews", reviewsRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app;
