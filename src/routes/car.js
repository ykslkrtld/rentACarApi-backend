"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/car:

const {isStaffOrisAdmin, isAdmin} = require("../middlewares/permissions");
const car = require("../controllers/car");

// URL: /cars

router.route("/")
  .get(car.list)
  .post(isStaffOrisAdmin, car.create);

router
  .route("/:id")
  .get(car.read)
  .put(isStaffOrisAdmin, car.update)
  .patch(isStaffOrisAdmin, car.update)
  .delete(isAdmin, car.delete);

/* ------------------------------------------------------- */
module.exports = router;
