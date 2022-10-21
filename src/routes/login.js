const router = require("express").Router();
const {login} = require("../controllers")

router.get("/", login.test);

module.exports = router