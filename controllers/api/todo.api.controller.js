const db = require("../../models");
const Todolist = db.todolists;

module.exports = {
  create: async (req, res) => {
    try {
      const { item } = req.body;
      const loggedInUser = req.session.user;

      if (!loggedInUser) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const newTodo = await Todolist.create({
        item,
        userId: loggedInUser.id,
      });
      res.status(201).json({ msg: "Todo successfully created", todo: newTodo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const todoId = req.params.id;
      const loggedInUser = req.session.user;

      if (!loggedInUser) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const todo = await Todolist.findOne({
        where: {
          id: todoId,
          userId: loggedInUser.id,
        },
      });
      if (!todo) {
        return res.status(404).json({ msg: "Item not found" });
      }
      await todo.destroy();
      res.status(200).json({ msg: "Item deleted successfully" });
    } catch (error) {
      console.error("Error when deleting item:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },
  show: async (req, res) => {
    try {
      const loggedInUser = req.session.user;

      if (!loggedInUser) {
        return res.status(401).json({ msg: "Unauthorized" });
      }
      const todo = await Todolist.findAll({
        where: {
          userId: loggedInUser.id,
        },
      });
      res
        .status(200)
        .json({ msg: "Todo item retrieved successfully", todo: todo });
    } catch (error) {
      console.error("Error retrieving todo items:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
