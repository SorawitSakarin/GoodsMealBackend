const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Supplier = require("../models/supplier");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const getSupplier = async (req, res, next) => {
  
  const supplierId = req.params.supplierId;
  let supplier;
  try {
    supplier = await Supplier.findById(supplierId);
  } catch (err) {
    const error = new HttpError(
      "เกิดผิดปกติในการหา Supplier จาก ID",
      500
    );
    console.log('Error')
    return next(error);
  }
  if (!supplier) {
    const error = new HttpError(
      `หา Supplier จาก ID: ${supplierId} นี้ไม่เจอ `,
      404
    );
    console.log('Error2')
    return next(error);
  }
  console.log('Ok เลย')
  res.json({ supplier: supplier.toObject({ getters: true }) }); //getters:true  คือเอา _ หน้า id ออก
};



const createSupplier = async (req, res, next) => {
  
  const { name, address } = req.body;
  // const title = req.body.title;
  const createdSupplier = new Supplier({
    name: name,
    address: address,
    location: {
      lat:'d',
      lng:'df'
    }
  });

  

  try {
    // const sess = await mongoose.startSession();
    // sess.startTransaction();
    await createdSupplier.save();   //{session:sess}
    // await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(`มีบางอย่างผิดพลาด ${name} ${address}`, 500);
    return next(error);
  }


  
  res.status(201).json({ supplier: 'created success' });
};

exports.getSupplier = getSupplier;

exports.createSupplier =createSupplier;


