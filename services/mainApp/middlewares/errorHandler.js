const errorHandler = (err, request, response, next) => {
    if (err.name === 'SequelizeValidationError') {
        const errorMessage = err.errors.map((el) => {
            return el.message
        })
        response.status(400).json({
            message: errorMessage
        })
    } else if (err.status) {
        response.status(err.status).json({
            message: err.message
        })
    } else {
        response.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = errorHandler