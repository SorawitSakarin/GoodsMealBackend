const express = require("express");
const { check } = require("express-validator");

const menusControllers = require("../controllers/menus-controllers");
const router = express.Router();

//Path   = local4000/api/users
router.get("/", menusControllers.getMenus);
router.get("/:supplierId", menusControllers.getMenusBySupplierId);
router.post(
  "/create",
  [
    check("nameThai").not().isEmpty(),
    check("nameEng").not().isEmpty(),
    check("mainIngredient").not().isEmpty(),
    check("cost").not().isEmpty(),
    check("supplierId").not().isEmpty(),
    check("supplierName").not().isEmpty()
  ],
  menusControllers.createMenu
);



module.exports = router;
