const router = require("express").Router();
const upload = require("../middleware/multer")
const {uploads} = require("../controllers")

router.post("/",upload.single(), uploads.testImage);

module.exports = router