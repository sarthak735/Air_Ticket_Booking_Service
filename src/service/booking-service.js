const axios = require('axios');

const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');

class BooingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
        try {
            const flightId = data.flightId;
            let getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const response = await axios.get(getFlightRequestUrl);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats) {
                throw new ServiceError('Something went wrong in the booking process', 'Insufficient seats in the flight');

            }

            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFLightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.flightId}`; 
            await axios.patch(updateFLightRequestUrl, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status: "Booked"});
            return finalBooking;
        } catch (error) {
            if(error.name = 'RespositoryError' || 'ValidationError'){
                throw error;
            }

            throw new ServiceError();
        }
    }
}

module.exports = BooingService;