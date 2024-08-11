require("dotenv").config();
// احزر شو شايف احرف Sequelize  ترا الاحرف بتفرق معك هون ف إنو ركز بليز
const { Sequelize } = require("sequelize");
// بالله كمان ركز عند ال new بنحط حرف كبير

// ---------------
// dialect هو نوع قاعدة البيانات الذي ستستخدمه مع Sequelize. يحدد كيفية التعامل مع قواعد البيانات المختلفة مثل PostgreSQL، MySQL، SQLite، MSSQL، وغيرها. يوجه dialect Sequelize في كيفية تنفيذ الاستعلامات والأوامر على قاعدة البيانات المحددة.
// ---------------

// const sequelize = new Sequelize(process.env.DATABASE, {
//   dialect: "postgres",
// });
// -----------
// ملاحظة خليها ببالك مكتبة Sequelize، يجب استخدام username بدلاً من user في خيارات التكوين الخاصة بقاعدة البيانات 
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
// -----------
// const sequelize = new Sequelize({
//   dialect: "postgres",
//   username: "postgres",
//   host: "localhost",
//   database: "sequelize",
//   password: "12345",
//   port: 5432,
// });

// طبعا بهمني اعمل check زبط عندي ال اتصال او لأ
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
testConnection();

module.exports = sequelize;
