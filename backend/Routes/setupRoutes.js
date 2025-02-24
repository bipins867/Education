const adminRouter = require("./Admin/admin");
const userRouter=require('./User/user')

const filesRouter = require("./Files/files");

exports.setupRoutes = (app) => {
  app.use("/admin", adminRouter);
  
  app.use("/files", filesRouter);
  app.use('/user',userRouter);
};
