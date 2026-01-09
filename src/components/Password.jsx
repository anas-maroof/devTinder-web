import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  };

  const changePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.put(
        BASE_URL + "/profile/password",
        { oldPassword, newPassword },
        { withCredentials: true }
      );

      handleLogout(); // force re-login after password change
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-base-300 w-full max-w-md rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-center text-white mb-6">
          🔐 Change Password
        </h2>

        {/* Old Password */}
        <div className="relative mb-4">
          <label className="text-sm text-gray-400">Old Password</label>
          <input
            type={showOld ? "text" : "password"}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="input input-bordered w-full pr-12 mt-1"
            placeholder="••••••••"
          />
          <span
            className="absolute right-4 top-9 cursor-pointer text-gray-400"
            onClick={() => setShowOld(!showOld)}
          >
            {showOld ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* New Password */}
        <div className="relative mb-4">
          <label className="text-sm text-gray-400">New Password</label>
          <input
            type={showNew ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input input-bordered w-full pr-12 mt-1"
            placeholder="••••••••"
          />
          <span
            className="absolute right-4 top-9 cursor-pointer text-gray-400"
            onClick={() => setShowNew(!showNew)}
          >
            {showNew ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Error */}
        {error && <p className="text-error text-sm mb-3">{error}</p>}

        {/* Button */}
        <button
          onClick={changePassword}
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>

        <p className="text-xs text-gray-400 text-center mt-4">
          You will be logged out after password change
        </p>
      </div>
    </div>
  );
};

export default Password;
