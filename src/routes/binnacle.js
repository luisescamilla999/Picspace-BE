const router = require("express").Router();
const {binnacle} = require("../controllers");

router.post("/", binnacle.getBinnacles);
module.exports = router