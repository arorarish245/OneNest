"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  // Signup handler
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        { email, password, name }
      );
      console.log(res.data);
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  // Email-Password Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/login`,
        { email, password }
      );
      localStorage.setItem("token", res.data.access_token);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-10 border rounded-lg shadow-md bg-white">
      <h1 className="text-3xl font-bold mb-6">Login / Signup</h1>

      <input
        type="text"
        placeholder="Name (for signup)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      <button onClick={handleSignup} className="w-full bg-teal-500 text-white p-2 rounded">
        Signup
      </button>

      <button onClick={handleLogin} className="w-full bg-blue-500 text-white p-2 rounded mt-4">
        Login
      </button>

      <button onClick={() => signIn("google")} className="w-full bg-orange-500 text-white p-2 rounded mt-4">
        Login with Google
      </button>
    </div>
  );
};

export default AuthForm;
