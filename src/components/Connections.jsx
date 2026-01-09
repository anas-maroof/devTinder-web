import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-300">
          No connections found 🤝
        </h1>
        <p className="text-gray-400">
          Go to feed page and start connecting with people.
        </p>
        <Link to="/feed" className="btn btn-success">
          Go to Feed
        </Link>
      </div>
    );
  }
  const validConnections = connections.filter(Boolean);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        🌱 Your Connections
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {validConnections.map((user) => (
          <div
            key={user._id}
            className="bg-base-300 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition relative"
          >
            {/* Profile */}
            <div className="flex items-center gap-4">
              <img
                src={user.photoUrl || "/default-avatar.png"}
                alt="profile"
                className="w-16 h-16 rounded-full object-cover border border-base-100"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-400 capitalize">
                  {user.gender} {user.age && `• ${user.age} yrs`}
                </p>
              </div>
            </div>

            {/* About */}
            {user.about && (
              <p className="text-sm text-gray-300 mt-4 line-clamp-3">
                {user.about}
              </p>
            )}

            {/* Skills */}
            {user.skills?.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-success"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {/* Social Links */}
            <div className="flex gap-4 mt-5">
              {user.github && (
                <a
                  href={user.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-400 hover:text-success text-xl transition"
                >
                  <FaGithub />
                </a>
              )}

              {user.linkedIn && (
                <a
                  href={user.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-success text-xl transition"
                >
                  <FaLinkedin />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
