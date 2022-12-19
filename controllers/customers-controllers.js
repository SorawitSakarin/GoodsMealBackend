const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Customer = require("../models/customer");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


const createCustomer = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const { lineId, lineName, lat, lng, province,district,subDistrict,name ,tel,postalCode,locationCode,locationName,address} = req.body;

  let existingUser;
  try {
    existingUser = await Customer.findOne({ tel: tel });
  } catch (err) {
    const error = new HttpError("Signup failed, please try again", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User exist already", 500);
    return next(error);
  } else {
    console.log(existingUser);
  }

  // const title = req.body.title;
  const createdCustomer = new Customer({
    status:'unsubscription',
    lineId,
    lineName,
    name,
    tel,
    address:{
      lat,
      lng,
      province,
      district,subDistrict,
      postalCode,
      locationCode,
      locationName,
      address
    },
    orders:[],
    suborders:[]
  });


  try {
    await createdCustomer.save(); 
  } catch (err) {
    const error = new HttpError("Creating customer failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ menus: "Created customer" });
};

const getCustomersByLocationCode = async (req,res,next) => {
  const locationCode = req.params.locationCode;
  let customers;

  try {
    customers = await Customer.find({ 'address.locationCode'  : locationCode });
  } catch (err) {
    const error = new HttpError(
      "Fetching customers failed, please try again later",
      500
    );
    return next(error);
  }

  if (!customers || customers.length === 0) {
    return next(
      new HttpError(`Could not find customers in this location kab`, 404)
    );
  }
  res.json({ customers: customers.map(customer=>customer.toObject({getters:true})) });
};

exports.createCustomer = createCustomer;

exports.getCustomersByLocationCode = getCustomersByLocationCode;

