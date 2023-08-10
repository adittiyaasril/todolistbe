const router = require("express").Router();

const userAPIRoutes = require("./api/user.routes");
const todoAPIRoutes = require("./api/todo.routes");

router.use("/api/v1/user", userAPIRoutes);
router.use("/api/v1/todo", todoAPIRoutes);

module.exports = router;
