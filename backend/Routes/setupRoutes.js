const adminRouter = require("./Admin/admin");
const userRouter = require("./User/user");
const instituteRouter = require("./Institute/institute");
const filesRouter = require("./Files/files");

exports.setupRoutes = (app) => {
  app.use("/admin", adminRouter);
  app.use("/institute", instituteRouter);
  app.use("/files", filesRouter);
  app.use("/user", userRouter);
};
