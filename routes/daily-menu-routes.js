const express = require("express");
const { check } = require("express-validator");

const dailyMenusControllers = require("../controllers/daily-menus-controllers");
const router = express.Router();

//Path   = local4000/api/users
// router.get("/", dailyMenusControllers.getMenus);
// router.get("/:supplierId", dailyMenusControllers.getMenusBySupplierId);
router.post(
  "/create",
  [
    check("calendar").not().isEmpty(),
    check("dailyMenu").not().isEmpty()
  ],
  dailyMenusControllers.createDailyMenus
);



module.exports = router;
