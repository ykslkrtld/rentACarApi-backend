"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:

const {isLogin, isStaffOrisAdmin, isAdmin} = require("../middlewares/permissions");
const reservation = require("../controllers/reservation");

// URL: /reservations

router
  .route("/")
  .get(isLogin, reservation.list)
  .post(isLogin, reservation.create);

router
  .route("/:id")
  .get(isLogin, reservation.read)
  .put(isStaffOrisAdmin, reservation.update)
  .patch(isStaffOrisAdmin, reservation.update)
  .delete(isAdmin, reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;
