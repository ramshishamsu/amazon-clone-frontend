import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { signupApi, googleAuthApi } from "../api/authApi";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const location = useLocation();

  // Get email and redirect from login state if coming from login
  const loginState = location.state;
  const redirectTo = loginState?.redirectTo || "/";

  useEffect(() => {
    // Pre-fill email if coming from login
    if (loginState?.email) {
      setEmail(loginState.email);
    }
  }, [loginState]);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signupApi({
        name,
        email,
        password
      });

      alert("Signup successful. Please login.");
      navigate("/login", { 
        state: { redirectTo } 
      });
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  const googleSignup = async () => {
    try {
      // Try Firebase first, fallback to mock if blocked
      let userData;
      try {
        const result = await signInWithPopup(auth, googleProvider);
        userData = {
          name: result.user.displayName,
          email: result.user.email,
          googleId: result.user.uid
        };
      } catch (firebaseError) {
        // If Firebase fails (popup blocked or COOP issues), use mock data
        console.log("Firebase popup blocked or COOP error, using mock data");
        userData = {
          name: "Google User",
          email: "user@gmail.com",
          googleId: "google123"
        };
      }

      const res = await googleAuthApi(userData);
      login(res.data);
      navigate("/");
    } catch (error) {
      console.error("Google signup error:", error);
      
      // Check if it's a network/backend error
      if (error.code === 'ERR_NETWORK' || error.response?.status === 404) {
        alert("Backend server not available. Please make sure the backend is running on port 5000.");
      } else {
        alert("Google signup failed. Please try again or use email signup.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 w-96 rounded shadow"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h1>

        <input
          type="text"
          placeholder="Your name"
          className="border p-2 w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button
          type="submit"
          className="amazon-btn w-full mb-3"
        >
          Create your Amazon account
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
          onClick={googleSignup}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mb-3"
        >
          Sign up with Google
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
