const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { default: mongoose, mongo } = require("mongoose");

const AreaLeader = require("../models/arealeader");
const Location = require("../models/location");


const getALByPhoneNumber = async (req, res, next) => {
  
  const tel = req.params.tel;
  let arealeader;
  try {
    arealeader = await AreaLeader.findOne({ tel: tel });
  } catch (err) {
    const error = new HttpError(
      "เกิดผิดปกติในการหา AreaLeader จากเบอร์โทรศัพท์",
      500
    );
    return next(error);
  }
  if (!arealeader) {
    const error = new HttpError(
      `เบอร์: ${tel} ยังไม่ได้ทำการลงทะเบียน `,
      404
    );
    return next(error);
  }
  console.log('Ok เลย')
  res.json({ arealeader: arealeader}); //getters:true  คือเอา _ หน้า id ออก
};

const createAreaLeader = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const {
    lineId,
    lineName,
    firstName,
    lastName,
    vehicle,
    mainJob,
    secJob,
    salary,
    sex,
    dob,
    tel,
    province,
    district,
    subDistrict,
    postalCode,
    address,
  } = req.body;

  // const title = req.body.title;
  const createdAreaLeader = new AreaLeader({
    status: null,
    lineId,
    lineName,
    firstName,
    lastName,
    vehicle,
    mainJob,
    secJob,
    salary,
    sex,
    dob,
    tel,
    location: {
      province,
      district,
      subDistrict,
      postalCode,
      address,
      locationCode: "",
    },
  });

  try {
    await createdAreaLeader.save();
  } catch (err) {
    const error = new HttpError("Creating arealeader failed, please try again", 500);
    return next(error);
  }


  res.status(201).json({ message: "Created AreaLeader" });
};

const approveAreaLeader = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("ใส่ข้อมูลมาผิด กรุณากรอกใหม่", 422));
  }

  const {
    lineId,
    lineName,
    firstName,
    lastName,
    vehicle,
    mainJob,
    secJob,
    salary,
    sex,
    dob,
    tel,
    locationCode,
  } = req.body;

  let existingAreaLeader;
  try {
    existingAreaLeader = await AreaLeader.findOne({ tel: tel });
  } catch (err) {
    const error = new HttpError(
      "Create areaLeader failed, please try again",
      500
    );
    return next(error);
  }

  if (existingAreaLeader) {
    const error = new HttpError("AreaLeader exist already", 500);
    return next(error);
  } else {
    console.log(existingAreaLeader);
  }

  let existingLocation;
  try {
    existingLocation = await Location.findOne({ locationCode: locationCode });
  } catch (err) {
    const error = new HttpError("Get location failed, please try again", 500);
    return next(error);
  }

  if (!existingLocation) {
    const error = new HttpError(
      "Location does not exist. Check Location Code again!!",
      500
    );
    return next(error);
  } else {
    console.log(existingLocation);
  }

  // const title = req.body.title;
  const createdAreaLeader = new AreaLeader({
    status: null,
    lineId,
    lineName,
    firstName,
    lastName,
    vehicle,
    mainJob,
    secJob,
    salary,
    sex,
    dob,
    tel,
    locationCode,
  });

  // try {
  //   await createdAreaLeader.save();
  // } catch (err) {
  //   const error = new HttpError("Creating arealeader failed, please try again", 500);
  //   return next(error);
  // }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdAreaLeader.save({ session: sess });
    existingLocation.areaLeaders.push(createdAreaLeader);
    await existingLocation.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating AL failed, please try again", 500);
    return next(error);
  }

  res.status(201).json({ message: "Created AreaLeader" });
};

exports.createAreaLeader = createAreaLeader;
exports.approveAreaLeader = approveAreaLeader;
exports.getALByPhoneNumber = getALByPhoneNumber;