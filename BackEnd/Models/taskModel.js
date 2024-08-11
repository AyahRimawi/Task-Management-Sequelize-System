const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Task = sequelize.define("Tasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // تأكد من أن الاسم هنا يتطابق مع اسم جدول الـ User في قاعدة البيانات
      key: "id",
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, // وصف المهمة ليس ضروريًا في كل الحالات
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Task;
