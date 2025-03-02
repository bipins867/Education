const StudentTeacher = require("./AndModels/StudentTeacher");
const UserSeries = require("./AndModels/UserSeries");
const UserSeriesTest = require("./AndModels/UserSeriesTest");
const UserSeriesTestQuestion = require("./AndModels/UserSeriesTestQuestion");
const Banner = require("./Banner/banner");
const Category = require("./TestSeries/Category");
const Option = require("./TestSeries/Option");
const Question = require("./TestSeries/Question");
const Series = require("./TestSeries/Series");
const Test = require("./TestSeries/Test");
const Student = require("./User/student");
const Teacher = require("./User/teacher");
const UserActivity = require("./User/UserActivity");
const User = require("./User/users");

exports.setupModels = () => {
  User.hasMany(UserActivity);
  UserActivity.belongsTo(User);

  User.hasOne(Student);
  Student.belongsTo(User);

  User.hasOne(Teacher);
  Teacher.belongsTo(User);

  User.hasMany(Category);
  Category.belongsTo(User);

  Category.hasMany(Series);
  Series.belongsTo(Category);

  Series.hasMany(Test);
  Test.belongsTo(Series);

  Test.hasMany(Question);
  Question.belongsTo(Test);

  Question.hasMany(Option);
  Option.belongsTo(Question);

  User.belongsToMany(Series, { through: UserSeries });
  Series.belongsToMany(User, { through: UserSeries });

  UserSeries.belongsToMany(Test, { through: UserSeriesTest });
  Test.belongsToMany(UserSeries, { through: UserSeriesTest });

  UserSeriesTest.belongsToMany(Question, { through: UserSeriesTestQuestion });
  Question.belongsToMany(UserSeriesTest, { through: UserSeriesTestQuestion });

  Student.belongsToMany(Teacher, { through: StudentTeacher });
  Teacher.belongsToMany(Student, { through: StudentTeacher });

  User.hasMany(Banner);
  Banner.belongsTo(User);

  Category.hasMany(Banner);
  Banner.belongsTo(Category);

  Series.hasMany(Banner);
  Banner.belongsTo(Series);

  Test.hasMany(Banner);
  Banner.belongsTo(Test);
};
