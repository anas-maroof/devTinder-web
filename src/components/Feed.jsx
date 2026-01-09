import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFeed = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      // instantly remove card
      dispatch(addFeed(feed.slice(1)));
    } catch (err) {
      console.log(err?.response?.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  /* 🟢 EMPTY FEED STATE */
  if (!feed || feed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-center gap-4">
        <h1 className="text-2xl font-bold text-gray-300">
          🎉 You’ve seen all profiles!
        </h1>
        <p className="text-gray-400">
          Wait for new developers to join DevTinder 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center my-6 gap-6">
      <UserCard user={feed[0]} />

      <div className="flex gap-6">
        <button
          className="btn btn-outline btn-error px-10"
          onClick={() => handleFeed("ignored", feed[0]._id)}
        >
          ❌ Ignore
        </button>

        <button
          className="btn btn-success px-10"
          onClick={() => handleFeed("interested", feed[0]._id)}
        >
          ❤️ Interested
        </button>
      </div>
    </div>
  );
};

export default Feed;
