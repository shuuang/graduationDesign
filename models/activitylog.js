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
      field: "aid"
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
      type: DataTypes.STRING(25),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "alintroduction"
    },
    aldate: {
      type: DataTypes.DATE,
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
    },
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "cid"
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
    },{
      name: 'club',
      unique: false,
      type: "BTREE",
      fields: ["cid"]
    }]
  };
  const ActivitylogModel = sequelize.define("activitylog_model", attributes, options);
  return ActivitylogModel;
};