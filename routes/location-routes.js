const express = require("express");
const { check } = require("express-validator");

const locationsControllers = require("../controllers/locations-controllers");
const router = express.Router();

//Path   = local4000/api/users
// router.get("/:locationCode", customersControllers.getCustomersByLocationCode);

router.post(
  "/create",
  [
    check("lat").not().isEmpty(),
    check("lng").not().isEmpty(),
    check("province").not().isEmpty(),
    check("district").not().isEmpty(),
    check("subDistrict").not().isEmpty(),
    check("postalCode").not().isEmpty(),
    check("locationCode").not().isEmpty(),
    check("locationName").not().isEmpty(),
    check("address").not().isEmpty(),
  ],
  locationsControllers.createLocation
);


module.exports = router;
