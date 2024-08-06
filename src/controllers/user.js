"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
// User Controller:

const User = require("../models/user");
const passwordValidation = require("../helpers/passwordValidation");
module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    let customFilter = { isAdmin: false };
    if (req.user?.isAdmin) {
      customFilter = {};
      //delete customFilter.isAdmin
    }
    const data = await res.getModelList(User, customFilter);

    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(User, customFilter),
      data,
    });
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                   $ref:"#/definitions/User"
                }
            }
        */
    passwordValidation(req?.body?.password);
    req.body.isAdmin = false;
    req.body.isStaff = false;
    //req.body.isStaff= req.user.isAdmin? req.body.isStaff || false;
    const data = await User.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */

    //? Yetkisiz kullanıcının başka bir kullanıcıyı yönetmesini engelle (sadece kendi verileri):
    // if (!req.user.isAdmin) {
    //     req.params.id = req.user.id
    // }
    // const data = await User.findOne({ _id: req.params.id })

    // const id = req.user.isAdmin ? req.params.id : req.user.id;

    let customFilter = { _id: req.user.id };
    if (req.user.isAdmin) {
      customFilter = { _id: req.params.id };
    } else if (req.user.isStaff) {
      customFilter = { _id: req.params.id, isAdmin: false };
    }
    const data = await User.findOne(customFilter);

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
               schema: {
                   $ref:"#/definitions/User"
                }
            }
        */
    passwordValidation(req?.body?.password);
    delete req.body.isAdmin;

    if (!req.user.isAdmin) {
      delete req.body.isStaff;
    }
    // if ((req.body.isStaff || req.body.isAdmin) && !req.user.isAdmin ) {
    //   throw new CustomError(
    //     "You are not authorized to set admin or staff privileges.",
    //     403,
    //   );
    // }

    let customFilter = { _id: req.user.id };
    if (req.user.isAdmin) {
      customFilter = { _id: req.params.id };
    } else if (req.user.isStaff) {
      customFilter = { _id: req.params.id, isAdmin: false };
    }
    //? Yetkisiz kullanıcının başka bir kullanıcıyı yönetmesini engelle (sadece kendi verileri):
    // if (!req.user.isAdmin) req.params.id = req.user._id;
    const data = await User.updateOne(customFilter, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */

    const data = await User.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
