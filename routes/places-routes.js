const express = require("express");

const placesControllers = require("../controllers/places-controllers");
const router = express.Router();
const { check } = require("express-validator");
const fileUpload = require('../middleware/file-upload'); 
const checkAuth = require('../middleware/check-auth');

//Path   = local4000/api/places/p1
router.get("/:pid", placesControllers.getPlaceById);

//Path   = local4000/api/places/user/u1
router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post(
  "/",
  fileUpload.single('image'),
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title").not().isEmpty(), 
    check("description").isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
