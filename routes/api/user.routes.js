const bodyParser = require("body-parser");
const userControllerAPI = require("../../controllers/api/user.api.controller");

const jsonParser = bodyParser.json();
const router = require("express").Router();

router.post("/register", jsonParser, userControllerAPI.register);
router.get("/check", jsonParser, userControllerAPI.check);
router.get("/profile", jsonParser, userControllerAPI.profile);
router.post("/login", jsonParser, userControllerAPI.login);
router.delete("/logout", jsonParser, userControllerAPI.logout);

module.exports = router;
