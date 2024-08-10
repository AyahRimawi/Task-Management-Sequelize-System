import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    // عند إرسال النموذج يعني يمنع إعادة تحميل الصفحة
    e.preventDefault();
    try {
      //   هون بنرسل طلب لل api للسيرفر
      await axios.post("http://localhost:5000/api/users/register", {
        //   بيانات الطلب المرسلة
        name,
        email,
        password,
      });
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 text-gray-800 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Sign Up
        </h2>
        {/* هلأ ال onSubmit هو الحدث الأعظم بنادي لما نبعت form اطلع فوق وشوف ال function تبعك */}
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            {/* htmlFor هاي لو تنقر على الاسم بتخلي يعمل foces عليها */}
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              //   هون عنا الحدث الأصغر بتذكروا الي في بداية الكتابة وطبعا متل ما حكينا سابقا الاشي الي في function بنستخدم معه ال set اما الي في style بنستخدم القيمة الابتدائية
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
