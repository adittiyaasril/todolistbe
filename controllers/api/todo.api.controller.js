const db = require("../../models");
const Todolist = db.todolists;
const jwt = require("jsonwebtoken");

module.exports = {
  create: async (req, res) => {
    try {
      const { item } = req.body;
      const token = req.header("x-auth-token");

      if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        }

        const newTodo = await Todolist.create({
          item,
          userId: decoded.userId,
        });

        res
          .status(201)
          .json({ msg: "Todo successfully created", todo: newTodo });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const todoId = req.params.id;
      const token = req.header("x-auth-token");

      if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        }

        const todo = await Todolist.findOne({
          where: {
            id: todoId,
            userId: decoded.userId,
          },
        });

        if (!todo) {
          return res.status(404).json({ msg: "Item not found" });
        }

        await todo.destroy();
        res.status(200).json({ msg: "Item deleted successfully" });
      });
    } catch (error) {
      console.error("Error when deleting item:", error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  show: async (req, res) => {
    try {
      const token = req.header("x-auth-token");

      if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
      }

      jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          return res.status(401).json({ msg: "Invalid token" });
        }

        const todo = await Todolist.findAll({
          where: {
            userId: decoded.userId,
          },
        });

        res
          .status(200)
          .json({ msg: "Todo item retrieved successfully", todo: todo });
      });
    } catch (error) {
      console.error("Error retrieving todo items:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};
