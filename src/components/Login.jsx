import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!emailId || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Submit on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-sm bg-base-300 shadow-xl border border-base-100">
        <div className="card-body gap-4">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center bg-linear-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
            Welcome Back 👋
          </h2>
          <p className="text-center text-sm text-gray-400">
            Login to continue to DevTinder
          </p>

          {/* Email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm text-gray-300">
              Email ID
            </legend>
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              placeholder="email@xyz.com"
              onChange={(e) => setEmailId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </fieldset>

          {/* Password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm text-gray-300">
              Password
            </legend>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                className="input input-bordered w-full pr-12 focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              {/* Show / Hide Icon */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </fieldset>

          {/* Error */}
          {error && (
            <p className="text-center text-sm text-error font-medium">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* Footer */}
          <Link to="/signup">
            <p className="text-center text-xs text-gray-400 mt-2">
              New here?{" "}
              <span className="text-primary cursor-pointer hover:underline">
                Create an account
              </span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
