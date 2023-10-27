const  {StatusCodes} = require('http-status-codes')
class ValidationError extends Error {
    constructor(error){
        super();
        let explanantion = [];
        error.errors.forEach((err) => {
            explanantion.push(err.message);
        })
        this.name = 'ValidationError';
        this.message = "Not able to validate the data sent in the request";
        this.explanantion = explanantion;
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

module.exports = ValidationError;