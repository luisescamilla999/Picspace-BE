const router = require("express").Router();
const {gallery} = require("../controllers")

router.get("/", gallery.getImages);

module.exports = router