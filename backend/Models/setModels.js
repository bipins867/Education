const UserActivity = require("./User/userActivity");
const UserProfile = require("./User/userProfile");
const User = require("./User/users");

exports.setupModels = () => {
  User.hasOne(UserProfile);
  UserProfile.belongsTo(User);

  User.hasMany(UserActivity);
  UserActivity.belongsTo(User);
};
