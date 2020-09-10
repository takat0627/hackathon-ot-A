'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // define association here
      Task.belongsTo(models.User, { as: 'reqUser', foreignKey: 'reqUserId', targetKey: 'id' });
      Task.belongsTo(models.User, { as: 'desUser', foreignKey: 'desUserId', targetKey: 'id' });
    }
  };
  Task.init({
    title: DataTypes.STRING,
    info: DataTypes.STRING,
    done: DataTypes.BOOLEAN,
    deadline: DataTypes.DATE,
    reqUserId: DataTypes.UUID,
    desUserId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};