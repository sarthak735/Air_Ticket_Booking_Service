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
        const payload = {
            data: {
                subject: 'This is a noti from queue',
                content: 'Some queue will subscribe this',
                recepientEmail: 'kuwarsarthaksingh735@gmail.com',
                notificationTime: "2023-11-08 09:21:00.000"
            },
            service: 'CREATE_TICKET'
        };
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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