import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, about, age, gender, skills, photoUrl, github, linkedIn } = user;

  return (
    <div className="flex justify-center my-2">
      <div className="card bg-base-300 w-80 shadow-xl rounded-2xl overflow-hidden">
        {/* Image */}
        <figure className="bg-black p-3">
          <img
            src={photoUrl || "https://via.placeholder.com/300"}
            alt="User"
            className="w-full h-42 object-contain rounded-xl"
          />
        </figure>

        {/* Body */}
        <div className="card-body p-4 text-base-content">
          {/* Name */}
          <h2 className="card-title text-xl font-semibold">
            {firstName} {lastName}
            {age && (
              <span className="badge badge-accent ml-2 text-xs">{age}</span>
            )}
            <div className="flex gap-4 mt-2">
              {github ? (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-xl"
                  title="GitHub"
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
                  title="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              ) : (
                <i className="fa-brands fa-linkedin text-gray-600 text-xl"></i>
              )}
            </div>
          </h2>

          {/* Gender */}
          {gender && (
            <p className="text-xs text-gray-400 capitalize">{gender}</p>
          )}

          {/* About (limited lines) */}
          {about && (
            <p className="text-sm text-gray-300 line-clamp-2 mt-2">{about}</p>
          )}

          {/* Skills (max visible) */}
          {skills?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-outline badge-info text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="card-actions justify-between mt-4">
            <button className="btn btn-outline btn-error btn-sm">Ignore</button>
            <button className="btn btn-primary btn-sm">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
