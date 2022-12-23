const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Supplier = require("../models/supplier");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const getSupplierByEmail = async (req, res, next) => {
  
  const supplierEmail = req.params.supplierEmail;
  let supplier;
  try {
    supplier = await Supplier.findOne({ email: supplierEmail });
  } catch (err) {
    const error = new HttpError(
      "เกิดผิดปกติในการหา Supplier จาก Email",
      500
    );
    console.log('Error')
    return next(error);
  }
  if (!supplier) {
    const error = new HttpError(
      `หา Supplier จาก Email: ${supplierEmail} นี้ไม่เจอ `,
      404
    );
    console.log('Error2')
    return next(error);
  }
  console.log('Ok เลย')
  res.json({ message: 'OK'}); //getters:true  คือเอา _ หน้า id ออก
};

const getSupplierById = async (req, res, next) => {
  
  const supplierId = req.params.supplierId;
  let supplier;
  try {
    supplier = await Supplier.findOne({ 'firebaseAuth.uid': supplierId });
  } catch (err) {
    const error = new HttpError(
      "เกิดผิดปกติในการหา Supplier จาก Id",
      500
    );
    return next(error);
  }
  if (!supplier) {
    const error = new HttpError(
      `หา Supplier จาก Id: ${supplierId} นี้ไม่เจอ `,
      404
    );
    return next(error);
  }
  console.log('Ok เลย')
  res.json({ supplier: supplier}); //getters:true  คือเอา _ หน้า id ออก
};



const signUpSupplier = async (req, res, next) => {
  
    const error = validationResult(req);
    if (!error.isEmpty()) {
      console.log(error);
      return next(new HttpError("Invalid input, Please check your input", 422));
    }
  
    const { auth } = req.body;
    const supplierEmail = req.params.supplierEmail;
  
    let supplier;
    try {
      supplier = await Supplier.findOne({ email: supplierEmail });
    } catch(err) {
      const error = new HttpError( "เกิดผิดปกติในการหา Supplier จาก Email",500);
      return next(error);
    }
  
    if (!supplier) {
      const error = new HttpError("หา Supplier จากเมลล์นี้ไม่เจอ", 500);
      return next(error);
    } else {
      console.log(supplier);
    }

    supplier.firebaseAuth = auth;

    try {
      await supplier.save();
    } catch(err) {
      const error = new HttpError('Something went wrong, could not update Supplier',500);
      console.log(supplier);
      return next(error);
    }
    res.status(200).json({ message:'SignUp Success' });
  };


exports.getSupplierByEmail = getSupplierByEmail;

exports.signUpSupplier =signUpSupplier;


exports.getSupplierById =getSupplierById;