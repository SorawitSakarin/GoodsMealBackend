const express = require("express");
const { check } = require("express-validator");

const arealeadersControllers = require("../controllers/arealeaders-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/:tel", arealeadersControllers.getALByPhoneNumber);

router.post(
  "/create",
  [
    check("code").not().isEmpty(),
    check("lineId").not().isEmpty(),
    check("lineName").not().isEmpty(),
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("vehicle").not().isEmpty(),
    check("mainJob").not().isEmpty(),
    check("secJob").not().isEmpty(),
    check("salary").not().isEmpty(),
    check("sex").not().isEmpty(),
    check("dob").not().isEmpty(),
    check("tel").not().isEmpty(),
    check("address").not().isEmpty(),
    check("postalCode").not().isEmpty(),
    check("province").not().isEmpty(),
    check("district").not().isEmpty(),
    check("subDistrict").not().isEmpty()
  ],
  arealeadersControllers.createAreaLeader
);

router.post(
  "/approve/:areaLeaderId",
  [
    check("lineId").not().isEmpty(),
    check("locationName").not().isEmpty(),
    check("locationCode").not().isEmpty(),
  ],
  arealeadersControllers.approveAreaLeader
);


module.exports = router;
