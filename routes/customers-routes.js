const express = require("express");
const { check } = require("express-validator");

const customersControllers = require("../controllers/customers-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/:locationCode", customersControllers.getCustomersByLocationCode);

router.post(
  "/create",
  [
    check("name").not().isEmpty(),
    check("lineId").not().isEmpty(),
    check("lineName").not().isEmpty(),
    check("tel").not().isEmpty(),
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
  customersControllers.createCustomer
);


module.exports = router;
