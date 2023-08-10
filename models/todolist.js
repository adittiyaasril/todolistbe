module.exports = (sequelize, DataTypes) => {
  const Todolist = sequelize.define("Todolist", {
    userId: DataTypes.INTEGER,
    item: DataTypes.STRING,
  });
  return Todolist;
};
