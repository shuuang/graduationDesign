const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    cmid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "cmid"
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
    num: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "num"
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "year"
    }
  };
  const options = {
    tableName: "clubmember",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "cccccid",
      unique: false,
      type: "BTREE",
      fields: ["cid"]
    }]
  };
  const ClubmemberModel = sequelize.define("clubmember_model", attributes, options);
  return ClubmemberModel;
};