"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Task.init(
    {
      user_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Task",
    },
  );
  return Task;
};
