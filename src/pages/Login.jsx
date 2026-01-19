import { useState, useContext } from "react";
import { loginApi } from "../api/authApi";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ where to go after login (VERY IMPORTANT)
  const redirectTo = location.state?.redirectTo || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginApi({ email, password });
      login(res.data);

      navigate(redirectTo); // ✅ FIX
    } catch (error) {
      // Check if it's "Account not found" error
      if (error.message?.includes("Account not found") || 
          error.response?.data?.message?.includes("Account not found") ||
          error.response?.status === 404) {
        alert("Account not found. Please create an account.");
        navigate("/signup", { 
          state: { email, redirectTo } 
        });
      } else {
        alert(error.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 w-96 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Sign In
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="amazon-btn w-full mb-3">
          Sign In
        </button>

        <p className="text-sm text-center">
          New to Amazon?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
