const router = require("express").Router();
const { albums } = require("../controllers");

router.post("/:ownerUserId", albums.newAlbum);
router.delete("/:idAlbum", albums.deleteAlbum);

module.exports = router