const router = require("express").Router();
const {register} = require("../controllers")

router.get("/", register.test);

module.exports = router