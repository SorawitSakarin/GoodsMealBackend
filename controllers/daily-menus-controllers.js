const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const DailyMenu = require("../models/dailymenu");
// const Supplier = require("../models/supplier");
// const bcrypt = require("bcryptjs");
// const { create } = require("../models/user");
// const jwt = require("jsonwebtoken");

// const getMenus = async (req, res, next) => {
//     let menus;
//     try {
//       menus = await Menu.find(); //({}, "-password")  -password  everything come out except password
//     } catch (err) {
//       const error = new HttpError("Fetching menus failed, please try again", 500);
//       return next(error);
//     }
//   res.status(201).json({ menus: menus.map((menu) => menu.toObject({ getters: true })) });
// };
// const getMenusBySupplierId = async (req, res, next) => {
//     const supplierId = req.params.supplierId;
//     let menus;
//     try {
//         menus = await Menu.find({ supplier: supplierId });
//     } catch (err) {
//       const error = new HttpError(
//         "Fetching menus failed, please try again later",
//         500
//       );
//       return next(error);
//     }
  
//     if (!menus || menus.length === 0) {
//       return next(
//         new HttpError(`Could not find menus provided supplierId kab`, 404)
//       );
//     }
//     res.json({ menus: menus.map(menu=>menu.toObject({getters:true})) });
//   };

const createDailyMenus = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const { calendar, dailyMenu} = req.body;

 


  // const createdDailyMenu = new DailyMenu({
  //   deliveryDate,
  //   calendar,
  //   menuName,
  //   menuId,
  //   supplierId,
  //   amount:0
  // });

  try {
    const promises = dailyMenu.map((order)=> {
      //here i am assigning foreign key
      const createdDailyMenu = new DailyMenu({
        deliveryDate:order.timeLocal,
        calendar,
        menuName: order.menuName,
        menuId: order.menuId,
        supplierId: order.supplierId,
        amount:0
      });
      return createdDailyMenu.save();
    });
    await Promise.all(promises);
  } catch (err) {
    const error = new HttpError("Creating dailyMenu failed, please try again", 500);
    return next(error);
  }

  // try {
  //   // const sess = await mongoose.startSession();
  //   // sess.startTransaction();
  //   await createdDailyMenu.save();  //{ session: sess }
  //   // user.name = 'Maliwan2'
  //   // await user.save({ session: sess });
  //   // await sess.commitTransaction();
  // } catch (err) {
  //   const error = new HttpError("Creating daily menu failed, please try again", 500);
  //   return next(error);
  // }

  res.status(201).json({ menus: "Created DailyMenu success" });
};

// exports.getMenus = getMenus;
// exports.getMenusBySupplierId = getMenusBySupplierId;

exports.createDailyMenus = createDailyMenus;
