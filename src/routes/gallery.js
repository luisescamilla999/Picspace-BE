const router = require("express").Router();
const {gallery} = require("../controllers")

router.get("/", gallery.getImages);

router.post("/", gallery.deleteImage);
module.exports = router