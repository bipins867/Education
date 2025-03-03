const InstUser = require("./AndModels/InstUser");
const Institute = require("./Institute/institute");
const InstituteProfile = require("./Institute/instituteProfile");
const Category = require("./TestSeries/Category");
const Option = require("./TestSeries/Option");
const Question = require("./TestSeries/Question");
const Series = require("./TestSeries/Series");
const Test = require("./TestSeries/Test");
const AdminActivity = require("./User/adminActivity");
const Admin = require("./User/admins");
const Student = require("./User/student");
const Teacher = require("./User/teacher");
const UserActivity = require("./User/userActivity");
const User = require("./User/users");

exports.setupModels = () => {
  Admin.hasMany(AdminActivity);
  AdminActivity.belongsTo(Admin);

  Institute.hasOne(InstituteProfile);
  InstituteProfile.belongsTo(Institute);

  Institute.belongsToMany(User, { through: InstUser });
  User.belongsToMany(Institute, { through: InstUser });

  InstUser.hasOne(Student);
  Student.belongsTo(InstUser);

  InstUser.hasOne(Teacher);
  Teacher.belongsTo(InstUser);

  InstUser.hasMany(UserActivity);
  UserActivity.belongsTo(InstUser);

  Institute.hasMany(UserActivity);
  UserActivity.belongsTo(Institute);

  Institute.hasMany(Category);
  Category.belongsTo(Institute);

  Category.hasMany(Series);
  Series.belongsTo(Category);

  Series.hasMany(Test);
  Test.belongsTo(Series);

  Test.hasMany(Question);
  Question.belongsTo(Test);

  Question.hasMany(Option);
  Option.belongsTo(Question);
};
