'use strict'
module.exports = function(sequelize, DataTypes) {
  const UserRole = sequelize.define(
    'UserRole',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      roleId: {
        type: DataTypes.INTEGER(20),
        field: 'role_id'
      },
      userId: {
        type: DataTypes.INTEGER(20),
        field: 'user_id'
      },
      createTime: {
        type: DataTypes.DATE,
        field: 'create_time'
      },
      updateTime: {
        type: DataTypes.DATE,
        field: 'update_time'
      }
    },
    {
      tableName: 'user_role'
    }
  )
  return UserRole
}
