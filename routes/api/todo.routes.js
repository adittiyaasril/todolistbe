const bodyParser = require("body-parser");
const todoControllerAPI = require("../../controllers/api/todo.api.controller");

const jsonParser = bodyParser.json();
const router = require("express").Router();

router.post("/create", todoControllerAPI.create);
router.delete("/delete/:id", todoControllerAPI.delete);
router.get("/show", todoControllerAPI.show);

module.exports = router;
