
const supabase = require("./supabaseClient");

const sequelize = require("./database"); // Adjust the path to your database configuration
//const sequelize = require("./postDatabase"); // Adjust the path to your database configuration
console.log(supabase)
exports.baseDir=__dirname;
exports.sequelize=sequelize;
exports.supabase=supabase