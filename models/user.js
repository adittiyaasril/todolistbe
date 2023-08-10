"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todolist, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          len: 5,
          isAlphanumeric: true,
          isUnique: (value, next) => {
            User.findAll({
              where: { username: value },
            }).then((user) => {
              if (user.length != 0) {
                next(new Error("username already in use"));
              }
              next();
            });
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          isUnique: (value, next) => {
            User.findAll({
              where: { email: value },
            }).then((email) => {
              if (email.length != 0) {
                next(new Error("email already in use"));
              }
              next();
            });
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: "password required",
          },
          len: {
            args: 4,
            msg: "Password must be longer than 4",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
