const router = require("express").Router();
const {register} = require("../controllers")

router.post("/", register.newUser);

module.exports = router