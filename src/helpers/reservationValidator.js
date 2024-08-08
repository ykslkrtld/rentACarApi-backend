const Reservation = require("../models/reservation");
const CustomError = require("../errors/customError");

const reservationValidator = async (
  startDate,
  endDate,
  carId,
  userId,
  reservationId = undefined,
) => {
  let queryWithReservationId = reservationId
    ? { _id: { $ne: reservationId } }
    : {};
  // Check if the car is already reserved for the given dates
  const isCarReserved = await Reservation.findOne({
    carId,
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
    ...queryWithReservationId,
  });

  if (isCarReserved) {
    throw new CustomError(
      "The car is already reserved for the given dates.",
      400,
    );
  }

  // Check if the user has a reservation for the given dates
  const userReservationInDates = await Reservation.findOne({
    userId,
    startDate: { $lte: endDate },
    endDate: { $gte: startDate },
    ...queryWithReservationId,
  });

  if (userReservationInDates) {
    throw new CustomError(
      "The user has already reserved another car for the given dates.",
      400,
    );
  }
};

module.exports = reservationValidator;
