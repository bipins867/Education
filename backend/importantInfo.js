
const supabase = require("./supabaseClient");

const sequelize = require("./database"); // Adjust the path to your database configuration
//const sequelize = require("./postDatabase"); // Adjust the path to your database configuration

exports.baseDir=__dirname;
exports.sequelize=sequelize;
exports.supabase=supabase
exports.FILE_LIMIT_SIZE=2 //In MB
exports.storageUseType='supabase'

exports.S3_FILE_PATH=`${process.env.SUPABASE_URL}/storage/v1/object/public/${process.env.SUPABASE_BUCCKET}/`