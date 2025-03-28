"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ Call FastAPI backend for JWT login
      const res = await axios.post("http://127.0.0.1:8000/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        const { access_token } = res.data;

        // ✅ Store token in localStorage
        localStorage.setItem("token", access_token);

        alert("Login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.detail || "Invalid email or password");
    }
  };

  // ✅ Google OAuth via next-auth
  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Login with Email
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white p-2 rounded mt-4"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
