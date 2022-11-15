const router = require("express").Router();
const {maintenance} = require("../controllers")

router.get("/:table", maintenance.getDataTables);
router.post("/:table", maintenance.insertData);
router.put("/:table/id/:id", maintenance.updateData);
router.delete("/:table/id/:id", maintenance.deleteData);

module.exports = router