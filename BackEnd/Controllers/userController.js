const User = require("../models/userModel"); // تأكد من أن المسار صحيح إلى النموذج
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// تسجيل مستخدم جديد
const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Received registration request:", { name, email });

  try {
    console.log("Attempting to create user");

    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    console.log("User created successfully:", newUser);

    // إنشاء التوكن
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "User created", newUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// تسجيل الدخول
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request with:", { email, password });

  try {
    // البحث عن المستخدم باستخدام البريد الإلكتروني
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // مقارنة كلمة المرور المدخلة مع كلمة المرور المخزنة
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // إنشاء التوكن
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// عرض بيانات غير محمية
const view = async (req, res) => {
  res.status(200).json({ message: "You can see data :)" });
};

// عرض بيانات محمية
const protectedRoute = (req, res) => {
  res.status(200).json({
    id: req.tokenValid.id,
    username: req.tokenValid.username,
    // أضف أي بيانات أخرى تريد إرجاعها هنا
  });
};

module.exports = { register, login, view, protectedRoute };
