var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Romodo" });
});

router.get("/test", (req, res) => {
	res.json({ message: "Hello from Node.js!" });
});

module.exports = router;
