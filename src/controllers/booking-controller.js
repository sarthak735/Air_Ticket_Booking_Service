const {StatusCodes} = require('http-status-codes');

const {BookingService}  = require('../service/index');

const bookingService = new BookingService();


const create = async (req, res) =>{
    try {
        const response = await bookingService.createBooking(req.body);
        console.log("FROM FLIGHT CONTROLLER", response);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Successfully completed booking',
            data: response,
            err: {}
        })
    } catch (error) {
        console.log("FROM BOOKING CONTROLLER", error);
        return res.status(error.statusCode).json({
            success: false,
            message: 'error.message',
            data: {},
            err: error.explanation
        })
    }
}

module.exports = {
    create
}