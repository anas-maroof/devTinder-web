import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Skill handlers */
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const skill = e.target.value.trim();
      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
      }
      e.target.value = "";
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSignUp = async () => {
    if (!firstName || !emailId || !password || !confirmPassword) {
      setError("First Name, Email and Password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          gender,
          age,
          about,
          skills,
          github,
          linkedIn,
          photoUrl,
        },
        { withCredentials: true }
      );

      toast.success("🎉 Account created successfully!");
      navigate("/login");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-200 flex justify-center py-12 px-4">
      <div className="bg-base-300 rounded-2xl shadow-xl w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          🚀 Create Your DevTinder Account
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="text-sm text-gray-400">First Name *</label>
            <input
              className="input input-bordered w-full mt-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-400">Last Name</label>
            <input
              className="input input-bordered w-full mt-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email *</label>
            <input
              type="email"
              className="input input-bordered w-full mt-1"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-400">Age</label>
            <input
              type="number"
              className="input input-bordered w-full mt-1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400">Password *</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-400">Confirm Password *</label>
            <input
              type="password"
              className="input input-bordered w-full mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-400">Gender</label>
            <select
              className="select select-bordered w-full mt-1"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* Photo */}
          <div>
            <label className="text-sm text-gray-400">Photo URL</label>
            <input
              className="input input-bordered w-full mt-1"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* About */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">About</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1"
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {/* Skills */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Skills</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="badge badge-success cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </span>
              ))}
            </div>
            <input
              className="input input-bordered w-full mt-2"
              placeholder="Type a skill and press Enter"
              onKeyDown={handleAddSkill}
            />
          </div>

          {/* Github */}
          <div>
            <label className="text-sm text-gray-400">GitHub</label>
            <input
              className="input input-bordered w-full mt-1"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="text-sm text-gray-400">LinkedIn</label>
            <input
              className="input input-bordered w-full mt-1"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-error text-sm mt-4">{error}</p>}

        <button
          className="btn btn-success w-full mt-6"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-success font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
