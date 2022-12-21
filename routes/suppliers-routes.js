const express = require("express");
const { check } = require("express-validator");

const suppliersControllers = require("../controllers/suppliers-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/:supplierEmail", suppliersControllers.getSupplier);


router.patch(
  "/:supplierEmail",
  [check("auth").not().isEmpty()],
  suppliersControllers.signUpSupplier
);

module.exports = router;
