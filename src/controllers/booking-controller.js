const {StatusCodes} = require('http-status-codes');

const {BookingService}  = require('../service/index');



const {createChannel, publishMessage} = require('../utils/messageQueue');
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');

const bookingService = new BookingService();

class BookingController {
    constructor() {
        
    }
    async sendMessageToQueue(req, res) {
        const channel = await createChannel();
        const data = {message: 'Success'};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'Successfully published the event',
            
        })
    }

    async create (req, res) {
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
}




module.exports = BookingController