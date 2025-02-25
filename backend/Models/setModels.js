const UserSeries = require("./AndModels/UserSeries");
const UserSeriesTest = require("./AndModels/UserSeriesTest");
const UserSeriesTestQuestion = require("./AndModels/UserSeriesTestQuestion");
const Category = require("./TestSeries/Category");
const Option = require("./TestSeries/Option");
const Question = require("./TestSeries/Question");
const Series = require("./TestSeries/Series");
const Test = require("./TestSeries/Test");
const StudentProfile = require("./User/studentProfile");
const TeacherProfile = require("./User/teacherProfile");
const UserActivity = require("./User/userActivity");
const User = require("./User/users");


exports.setupModels = () => {

  User.hasMany(UserActivity);
  UserActivity.belongsTo(User);


  User.hasOne(StudentProfile)
  StudentProfile.belongsTo(User)


  User.hasOne(TeacherProfile)
  TeacherProfile.belongsTo(User)


  User.hasMany(Category)
  Category.belongsTo(User)


  Category.hasMany(Series)
  Series.belongsTo(Category)


  Series.hasMany(Test)
  Test.belongsTo(Series)


  Test.hasMany(Question)
  Question.belongsTo(Test)

  Question.hasMany(Option)
  Option.belongsTo(Question)

  User.belongsToMany(Series,{through:UserSeries})
  Series.belongsToMany(User,{through:UserSeries})

  UserSeries.belongsToMany(Test,{through:UserSeriesTest})
  Test.belongsToMany(UserSeries,{through:UserSeriesTest})


  UserSeriesTest.belongsToMany(Question,{through:UserSeriesTestQuestion})
  Question.belongsToMany(UserSeriesTest,{through:UserSeriesTestQuestion})

  
};
