var express = require("express");
const pincode = require("../controllers/pincodeControllerData");
var router = express.Router();
// const pincodeController = require("../controllers/pincodeController");

/* GET users listing. */
router.post("/", pincode.createPincode);

module.exports = router;
