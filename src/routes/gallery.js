const router = require("express").Router();
const {gallery} = require("../controllers")

router.get("/", gallery.getImages);
router.get("/album", gallery.getAlbums);
router.delete("/:imageId", gallery.deleteImage);
module.exports = router