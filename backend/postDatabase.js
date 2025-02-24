const { Sequelize } = require("sequelize");
console.log(process.env.SUPABASE_DATABASE_URL);
const sequelize = new Sequelize(process.env.SUPABASE_DATABASE_URL, {
  dialect: "postgres", // Use PostgreSQL
  dialectOptions: {
    ssl: {
      require: true, // Required for Supabase
      rejectUnauthorized: false, // Avoid self-signed certificate issues
    },
  },
  logging: false, // Set to true if you want to log SQL queries
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully to Supabase!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
