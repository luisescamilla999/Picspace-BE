const router = require("express").Router();
const { dashboard } = require("../controllers")

router.get("/TUser", dashboard.getTotalUser);
router.post("/DRegister", dashboard.getDateRegister);
router.get("/TImage", dashboard.getTotalImages);
router.get("/UStorage", dashboard.getUseStorage);
router.post("/DImage", dashboard.getDateImage);
router.get("/UPlan", dashboard.getPlanUse);

module.exports = router