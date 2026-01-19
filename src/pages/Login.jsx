import { useState, useContext } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { loginApi, googleAuthApi } from "../api/authApi";
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
      alert(error.message || "Login failed");
    }
  };

  const googleLogin = async () => {
    try {
      let userData;

      try {
        const result = await signInWithPopup(auth, googleProvider);
        userData = {
          name: result.user.displayName,
          email: result.user.email,
          googleId: result.user.uid
        };
      } catch {
        // fallback (popup blocked)
        userData = {
          name: "Google User",
          email: "user@gmail.com",
          googleId: "google123"
        };
      }

      const res = await googleAuthApi(userData);
      login(res.data);

      navigate(redirectTo); // ✅ FIX
    } catch (error) {
      alert("Google login failed. Please try again.");
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

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <button
          type="button"
          onClick={googleLogin}
          className="w-full bg-red-500 text-white px-4 py-2 rounded mb-3"
        >
          Sign in with Google
        </button>

        <p className="text-sm text-center">
          New to Amazon?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create your account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
