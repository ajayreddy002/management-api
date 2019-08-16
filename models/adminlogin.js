'use strict';
module.exports = (sequelize, DataTypes) => {
  const adminLogin = sequelize.define('adminLogin', {
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    roll: DataTypes.STRING
  }, {});
  adminLogin.associate = function(models) {
    // associations can be defined here
  };
  return adminLogin;
};