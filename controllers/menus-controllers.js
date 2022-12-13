const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Menu = require("../models/menu");
const Supplier = require("../models/supplier");
// const bcrypt = require("bcryptjs");
// const { create } = require("../models/user");
// const jwt = require("jsonwebtoken");

const getMenus = async (req, res, next) => {
    let menus;
    try {
      menus = await Menu.find(); //({}, "-password")  -password  everything come out except password
    } catch (err) {
      const error = new HttpError("Fetching menus failed, please try again", 500);
      return next(error);
    }
  res.status(201).json({ menus: menus.map((menu) => menu.toObject({ getters: true })) });
};
const getMenusBySupplierId = async (req, res, next) => {
    const supplierId = req.params.supplierId;
    let menus;
    try {
        menus = await Menu.find({ supplier: supplierId });
    } catch (err) {
      const error = new HttpError(
        "Fetching menus failed, please try again later",
        500
      );
      return next(error);
    }
  
    if (!menus || menus.length === 0) {
      return next(
        new HttpError(`Could not find menus provided supplierId kab`, 404)
      );
    }
    res.json({ menus: menus.map(menu=>menu.toObject({getters:true})) });
  };

const createMenu = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const { nameThai, nameEng, mainIngredient, cost, supplierId,supplierName,protein,carb ,fat,calorie} = req.body;

  // const title = req.body.title;
  const createdMenu = new Menu({
    nameThai,
    nameEng,
    mainIngredient,
    protein,
    carb,
    fat,
    calorie,
    cost,
    supplierId,
    supplierName
  });

  let user;
  try {
    user = await Supplier.findById(supplierId);
  } catch (err) {
    const error = new HttpError("Supplier find by id failed", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }
  console.log(user);

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    await createdMenu.save();  //{ session: sess }
    // user.name = 'Maliwan2'
    // await user.save({ session: sess });
    // await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ menus: "Created menus" });
};

exports.getMenus = getMenus;
exports.getMenusBySupplierId = getMenusBySupplierId;

exports.createMenu = createMenu;
