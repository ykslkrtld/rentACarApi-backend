"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./auth"));
// car:
// router.use("/cars", require("./car"));
// token:
router.use("/tokens", require("./token"));
// reservation:
// router.use("/reservations", require("./reservation"));
// user:
router.use("/users", require("./user"));
// document:
router.use("/documents", require("./document"));

/* ------------------------------------------------------- */
module.exports = router;
