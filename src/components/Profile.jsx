import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((store) => store.user);
  if (!user) return null;

  const {
    firstName,
    lastName,
    emailId,
    age,
    gender,
    about,
    skills,
    photoUrl,
    github,
    linkedIn,
  } = user;

  const Field = ({ label, value }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span
        className={`text-sm ${
          value ? "text-gray-200" : "text-gray-500 italic"
        }`}
      >
        {value || "Not available"}
      </span>
    </div>
  );

  return (
    <div className="bg-base-200 flex justify-center py-10 px-4">
      <div className="bg-base-300 rounded-2xl shadow-xl p-6 w-full max-w-4xl">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="flex flex-col items-center text-center gap-4 md:border-r border-base-100 md:pr-6">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
                <img src={photoUrl} alt="Profile" />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-gray-400">{emailId}</p>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex gap-4 mt-1">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-xl"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              ) : (
                <i className="fa-brands fa-github text-gray-600 text-xl"></i>
              )}

              {linkedIn ? (
                <a
                  href={linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-500 text-xl"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              ) : (
                <i className="fa-brands fa-linkedin text-gray-600 text-xl"></i>
              )}
            </div>

            <Link
              to="/edit"
              className="btn btn-outline btn-primary btn-sm mt-2"
            >
              ✏️ Edit Profile
            </Link>
          </div>

          {/* RIGHT PANEL */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Field label="Age" value={age} />
            <Field label="Gender" value={gender} />

            <div className="sm:col-span-2">
              <Field label="About" value={about} />
            </div>

            <div className="sm:col-span-2">
              <span className="text-xs text-gray-400">Skills</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-primary badge-outline"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500 italic text-sm">
                    Not available
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
