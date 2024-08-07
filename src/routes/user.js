"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/user:

const {isLogin, isStaffOrisAdmin, isAdmin} = require("../middlewares/permissions");
const user = require("../controllers/user");

// URL: /users

router
  .route("/")
  .get(isStaffOrisAdmin, user.list)
  .post(user.create);

router
  .route("/:id")
  .get(isLogin, user.read)
  .put(isLogin, user.update)
  .patch(isLogin, user.update)
  .delete(isAdmin, user.delete);

/* ------------------------------------------------------- */
module.exports = router;
