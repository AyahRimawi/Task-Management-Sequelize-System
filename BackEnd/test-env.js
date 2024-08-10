// test-env.js
require("dotenv").config();

console.log('Database Connection String:', process.env.DATABASE);

// console.log("Database User:", process.env.DB_USER);
// console.log("Database Host:", process.env.DB_HOST);
// console.log("Database Name:", process.env.DB_NAME);
// console.log("Database Password:", process.env.DB_PASSWORD);
// console.log("Database Port:", process.env.DB_PORT);

// --------------------------------------------------------------------------------------------------------------------------------------
// الهدف منه اعمل test اذا كانت متغيرات يتم تحميلها بشكل صحيح
// خلي ببالك معلومة كتير مهمة ملف ال test هو صديق ملازم لملف ال .env يعني هدول الملفين لازم جنب بعض ليشتغل معك ال test
// ادخل على ملف ال back بعدها على ملف config بعدها بوجهك على ال run
// بكل بساطة اعمل run ل node test-env.js
// والمفروض الناتج يكون
// ===========
// في حال link يكون الجواب
// postgresql://postgres:12345@localh
// ----------------------------------------------
// اما في حال الكلام بكون كالآتي
// Database User: postgres
// Database Host: localhost
// Database Name: test
// Database Password: 12345
// Database Port: 5432
