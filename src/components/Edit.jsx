import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  /* 🔑 Sync Redux user → Local form state */
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setPhotoUrl(user.photoUrl || "");
      setAbout(user.about || "");
      setSkills(user.skills || []);
      setGithub(user.github || "");
      setLinkedIn(user.linkedIn || "");
    }
  }, [user]);

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

  if (!user) return null;

  return (
    <div className="bg-base-200 flex justify-center py-10 px-4">
      <div className="bg-base-300 rounded-2xl shadow-xl w-full max-w-3xl p-6">
        <h2 className="text-xl font-bold text-center text-white mb-6">
          ✏️ Edit Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* First Name */}
          <div>
            <label className="text-sm text-gray-400">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-sm text-gray-400">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Profile Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          {/* GitHub */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">GitHub Profile</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="https://github.com/username"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          {/* LinkedIn */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">LinkedIn Profile</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1"
              placeholder="https://linkedin.com/in/username"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
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
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-primary gap-1 cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ✕
                </span>
              ))}
            </div>

            <input
              type="text"
              className="input input-bordered w-full mt-3"
              placeholder="Type a skill and press Enter"
              onKeyDown={handleAddSkill}
            />
          </div>
        </div>

        {/* Save Button */}
        <div>{error && <p className="text-error text-sm mt-1">{error}</p>}</div>
        <div className="flex justify-center mt-8">
          <button className="btn btn-primary px-10" onClick={saveProfile}>
            💾 Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
