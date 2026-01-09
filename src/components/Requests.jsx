import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      fetchRequest(); // refresh list
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
        <h1 className="text-2xl font-bold text-gray-300">
          No pending requests 🙌
        </h1>
        <p className="text-gray-400">
          Explore feed and connect with new people.
        </p>
        <Link to="/" className="btn btn-success">
          Go to Feed
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-white mb-10">
        📩 Connection Requests
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="bg-base-300 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition"
            >
              {/* Profile */}
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

                  {/* Social links */}
                  <div className="flex gap-3 mt-1">
                    {user.github && (
                      <a
                        href={user.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-success transition text-lg"
                      >
                        <FaGithub />
                      </a>
                    )}

                    {user.linkedIn && (
                      <a
                        href={user.linkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-success transition text-lg"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
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

              {/* Actions */}
              <div className="flex justify-between gap-4 mt-6">
                <button
                  className="btn btn-outline btn-error w-1/2"
                  onClick={() => handleRequest("rejected", req._id)}
                >
                  ❌ Reject
                </button>
                <button
                  className="btn btn-success w-1/2"
                  onClick={() => handleRequest("accepted", req._id)}
                >
                  ✅ Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
