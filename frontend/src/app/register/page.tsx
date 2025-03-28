"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiLoader } from "react-icons/fi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register", {
        email,
        password,
      });

      if (res.status === 201) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      setError(error.response?.data?.detail || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    // You can add Google registration logic here if needed
    console.log("Google registration clicked!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#B8E6E2] to-[#F8F8F8]">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border-t-4 border-teal-500">
        <h1 className="text-3xl font-bold text-teal-600 mb-6 text-center">
          Create Your Account 🚀
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
              placeholder="Create a password"
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
              "Register with Email"
            )}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>

        <div className="my-4 flex items-center">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-400">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            className="text-teal-500 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
