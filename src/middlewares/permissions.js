"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// Middleware: permissions

const CustomError = require('../errors/customError')

module.exports = {

    isLogin: (req, res, next) => {

        if (req.user) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login.')
        }

    },
    isStaffOrisAdmin: (req, res, next) => {
        if (! (req.user.isAdmin || req.user.isStaff)) {
          throw new CustomError(
            "AuthorizationError: You must be an Admin or Staff to access this resource.", 403
          );
        }
        if(!req.user?.isActive) {
            throw new CustomError(
                'Your account is not active. Please contact support', 403
            )
        }
        next();
      },
    isAdmin: (req, res, next) => {

        if (req.user && req.user.isAdmin) {
            next()
        } else {
            res.errorStatusCode = 403
            throw new Error('NoPermission: You must login and to be Admin.')
        }

    },
}

