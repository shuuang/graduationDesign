const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    cuid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "cuid"
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
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cid",
      references: {
        key: "cid",
        model: "club_model"
      }
    },
    privilege: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "privilege"
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "status"
    },
    uappyear: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "uappyear"
    }
  };
  const options = {
    tableName: "clubuser",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "uid",
      unique: false,
      type: "BTREE",
      fields: ["uid"]
    }, {
      name: "cid",
      unique: false,
      type: "BTREE",
      fields: ["cid"]
    }]
  };
  const ClubuserModel = sequelize.define("clubuser_model", attributes, options);
  return ClubuserModel;
};