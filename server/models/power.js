'use strict'
module.exports = function(sequelize, DataTypes) {
  const Power = sequelize.define(
    'Power',
    {
      id: {
        type: DataTypes.INTEGER(20).UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      powerCode: {
        type: DataTypes.STRING(45),
        field: 'power_code'
      },
      powerName: {
        type: DataTypes.STRING(45),
        field: 'power_name'
      },
      powerType: {
        type: DataTypes.STRING(45),
        field: 'power_type'
      },
      powerPath: {
        type: DataTypes.STRING(45),
        field: 'power_path'
      },
      parentId: {
        type: DataTypes.INTEGER(20),
        field: 'parent_id'
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
      tableName: 'power'
    }
  )
  return Power
}
