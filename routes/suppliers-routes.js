const express = require("express");
const { check } = require("express-validator");

const suppliersControllers = require("../controllers/suppliers-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/:supplierId", suppliersControllers.getSupplier);

router.post("/", suppliersControllers.createSupplier);

module.exports = router;
