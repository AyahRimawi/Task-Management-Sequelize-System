const User = require("./user");
const Task = require("./task");

// تحديد العلاقة
User.hasMany(Task, { foreignKey: "user_id" });
Task.belongsTo(User, { foreignKey: "user_id" });
