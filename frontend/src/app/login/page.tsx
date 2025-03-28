"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { access_token } = res.data;
        localStorage.setItem("token", access_token);
        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.detail || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B8E6E2] to-[#F8F8F8]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <div>
            <label className="text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <FiLoader className="animate-spin mr-2" />
            ) : (
              "Login with Email"
            )}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-400">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition flex items-center justify-center"
        >
          <FaGoogle className="mr-2" /> Login with Google
        </button>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            className="text-teal-500 cursor-pointer hover:underline"
            onClick={() => router.push("/register")}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
