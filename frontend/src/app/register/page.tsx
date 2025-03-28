"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError("");  // Clear previous errors
  
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/register", { email, password });
  
      if (res.status === 201) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Error:", error);
      
      // Handle backend validation errors properly
      if (error.response) {
        setError(error.response.data.detail || "Failed to register.");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button type="submit" className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600">
          Register
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
