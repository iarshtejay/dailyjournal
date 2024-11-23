const express = require("express");
const router = express.Router();

router.use("/journals", require("../api/journals/routes/routes"));
router.use("/entries", require("../api/entries/routes/routes"));

module.exports = router;
