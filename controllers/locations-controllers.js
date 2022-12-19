const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Location = require("../models/location");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const createLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const {
    lat,
    lng,
    province,
    district,
    subDistrict,
    postalCode,
    locationCode,
    locationName,
    address,
  } = req.body;

  let existingLocation;
  try {
    existingLocation = await Location.findOne({ locationCode: locationCode });
  } catch (err) {
    const error = new HttpError(
      "Create location failed, please try again",
      500
    );
    return next(error);
  }

  if (existingLocation) {
    const error = new HttpError("LocationCode exist already", 500);
    return next(error);
  } else {
    console.log(existingLocation);
  }

  const createdLocation = new Location({
    lat,
    lng,
    province,
    district,
    subDistrict,
    postalCode,
    locationCode,
    locationName,
    address,

    areaLeaders: [],
    lastMiles: [],
    customers: [],
  });

  try {
    await createdLocation.save();
  } catch (err) {
    const error = new HttpError(
      "Creating location failed, please try again",
      500
    );
    return next(error);
  }

  res.status(201).json({ menus: "Created location" });
};

// const getCustomersByLocationCode = async (req, res, next) => {
//   const locationCode = req.params.locationCode;
//   let customers;

//   try {
//     customers = await Customer.find({ "address.locationCode": locationCode });
//   } catch (err) {
//     const error = new HttpError(
//       "Fetching customers failed, please try again later",
//       500
//     );
//     return next(error);
//   }

//   if (!customers || customers.length === 0) {
//     return next(
//       new HttpError(`Could not find customers in this location kab`, 404)
//     );
//   }
//   res.json({
//     customers: customers.map((customer) =>
//       customer.toObject({ getters: true })
//     ),
//   });
// };

exports.createLocation = createLocation;
