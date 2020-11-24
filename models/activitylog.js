const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    alid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "alid"
    },
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aid",
      references: {
        key: "aid",
        model: "activity_model"
      }
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "img"
    },
    video: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "video"
    },
    alintroduction: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alintroduction"
    },
    aldate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "aldate"
    },
    alcounts: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alcounts"
    }
  };
  const options = {
    tableName: "activitylog",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "aactivityid",
      unique: false,
      type: "BTREE",
      fields: ["aid"]
    }]
  };
  const ActivitylogModel = sequelize.define("activitylog_model", attributes, options);
  return ActivitylogModel;
};