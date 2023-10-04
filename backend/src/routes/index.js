const express = require("express");
const router = express.Router();

router.use("/journals", require("../api/journals/routes/routes"));

module.exports = router;
