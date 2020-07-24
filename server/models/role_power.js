'use strict'
module.exports = function(sequelize, DataTypes) {
  const RolePower = sequelize.define(
    'RolePower',
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
      powerId: {
        type: DataTypes.INTEGER(20),
        field: 'power_id'
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
      tableName: 'role_power'
    }
  )
  return RolePower
}
