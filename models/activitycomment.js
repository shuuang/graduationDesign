const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    acid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "acid"
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "comment"
    },
    alid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alid",
      references: {
        key: "alid",
        model: "activitylog_model"
      }
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uid",
      references: {
        key: "uid",
        model: "users_model"
      }
    },
    createAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "createAt"
    }
  };
  const options = {
    tableName: "activitycomment",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "uuuid",
      unique: false,
      type: "BTREE",
      fields: ["uid"]
    }, {
      name: "alid",
      unique: false,
      type: "BTREE",
      fields: ["alid"]
    }]
  };
  const ActivitycommentModel = sequelize.define("activitycomment_model", attributes, options);
  return ActivitycommentModel;
};