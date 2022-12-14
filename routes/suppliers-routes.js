const express = require("express");
const { check } = require("express-validator");

const suppliersControllers = require("../controllers/suppliers-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/email/:supplierEmail", suppliersControllers.getSupplierByEmail);
router.get("/id/:supplierId", suppliersControllers.getSupplierById);

router.patch(
  "/email/:supplierEmail",
  [check("auth").not().isEmpty()],
  suppliersControllers.signUpSupplier
);

module.exports = router;
