"use strict";

const CustomError = require("../errors/customError");

const validateDateRange = (req, res, next) => {
  const { startDate, endDate } = req.method === "GET" ? req.query : req.body;

  if ((method === "PUT" || method === "PATCH") && !startDate && !endDate) {
    return next();
  }

  if (!startDate || !endDate) {
    return next(
      new CustomError("Both startDate and endDate are required", 400),
    );
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return next(new CustomError("Invalid date format", 400));
  }

  today.setHours(0, 0, 0, 0);

  if (start >= end) {
    return next(new CustomError("startDate must be earlier than endDate", 400));
  }

  if (start < today || end < today) {
    return next(new CustomError("Dates must not be in the past", 400));
  }

  const diffTime = Math.abs(end - start);
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  req.dateValidation = { totalDays, start, end };

  next();
};

module.exports = validateDateRange;
