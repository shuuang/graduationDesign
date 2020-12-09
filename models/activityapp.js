const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    aaid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "aaid"
    },
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cid",
    },
    aaName: {
      type: DataTypes.STRING(8),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aaName"
    },
    aaConnect: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aaConnect"
    },
    aafile: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aafile"
    },
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aid"
    }
  };
  const options = {
    tableName: "activityapp",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "cccid",
      unique: false,
      type: "BTREE",
      fields: ["cid"]
    }, {
      name: "activityid",
      unique: false,
      type: "BTREE",
      fields: ["aid"]
    }]
  };
  const ActivityappModel = sequelize.define("activityapp_model", attributes, options);
  return ActivityappModel;
};