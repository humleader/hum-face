'use strict'
module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define(
    'Role',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      roleCode: {
        type: DataTypes.STRING(64),
        field: 'role_code'
      },
      roleName: {
        type: DataTypes.STRING(128),
        field: 'role_name'
      },
      roleType: {
        type: DataTypes.INTEGER(2),
        field: 'role_type'
      },
      roleDesc: {
        type: DataTypes.TEXT,
        field: 'role_desc'
      },
      userId: {
        type: DataTypes.INTEGER(20),
        field: 'user_id'
      },
      updateUserId: {
        type: DataTypes.INTEGER(20),
        field: 'update_user_id'
      },
      recycleStatus: {
        type: DataTypes.INTEGER(8),
        field: 'recycle_status'
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
      tableName: 'role'
    }
  )

  return Role
}
