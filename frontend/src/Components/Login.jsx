import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 text-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
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
          <Link to={"/Task"}>
            <button
              type="submit"
              className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors duration-200"
            >
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
