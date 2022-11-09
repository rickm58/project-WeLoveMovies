function errorHandler(err, req, res, next){
    const {status = 500, message = "Something went wrong!" } = err
    console.log(err)
    res.status(status).json({ error: message })
}

module.exports = errorHandler