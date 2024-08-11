// من صديقتنا الجديدة sequelize راح جاب ال DataTypes عفوَا مين هدول ؟
// sequelize هي مكتبة ORM شو هاد حكي كبير؟ بكل بساطة وبدون حكي كتير هي تقنية تستخدم لتسهيل التفاعل ما بين الداتا بيز والكود تبع ال js الي بستخدم في OOP
// DataTypes هي هون بحدد نوع البيانات لتعريف الأعمدة
const { DataTypes } = require("sequelize");

// بدل ال pool صار هاد اتصالنا الي عملنا بال db.js
const sequelize = require("../config/db");

// كنا قبل نستخدم class و static وعجقة هلأ نو بكل بساطة بنستخدم دالة موجودة ب sequelize الي هي define
// هاي بتعرف جدول جديد بتاخد قيمتين: اسم الجول ,, والتاني محتوياته مع تفصيل لكل محتوى
const User = sequelize.define("User", {
  id: {
    //النوع: انو نوع الداتا عدد صحيح
    type: DataTypes.INTEGER,
    // قيمة العمود تزداد تلقائي
    autoIncrement: true,
    // حدد انو هاد العمود هو المفتاح الاساسي
    primaryKey: true,
  },
  name: {
    // النوع: نوع الداتا بهالعمود سلسلة نصية
    type: DataTypes.STRING,
    // وهون بيحكي هالعمود ممنوع يكون فاضي
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // لضمان عدم تكرار البريد الإلكتروني
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
