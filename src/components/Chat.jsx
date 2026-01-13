import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);

  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef(null);

  const targetUser = messages.find(
    (msg) => String(msg.senderId?._id) !== String(userId)
  )?.senderId;

  const targetUserName = targetUser?.firstName
    ? `${targetUser.firstName} ${targetUser.lastName || ""}`
    : "Connection";

  const targetUserPhoto =
    targetUser?.photoUrl ||
    "https://geographyandyou.com/images/user-profile.png";

  /* -------- Fetch chat from DB -------- */
  useEffect(() => {
    const fetchChat = async () => {
      const res = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
        withCredentials: true,
      });
      setMessages(res.data.messages || []);
    };
    fetchChat();
  }, [targetUserId]);

  /* -------- Socket setup -------- */
  useEffect(() => {
    if (!userId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.emit("joinChat", {
      userId,
      targetUserId,
    });

    socketRef.current.on("messageRecieved", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socketRef.current.disconnect();
  }, [userId, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      userId,
      targetUserId,
      newMessage,
    });

    setNewMessage("");
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="flex justify-center items-center bg-base-200 py-2">
      <div className="w-full max-w-3xl h-[75vh] bg-base-300 rounded-2xl shadow-xl flex flex-col">
        {/* 🔹 Chat Header */}
        <div className="flex items-center gap-4 p-4 border-b border-base-100 bg-base-300 sticky top-0 z-10">
          <img
            src={targetUserPhoto}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">
              {targetUserName}
            </h2>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-base-200">
          {messages.map((msg, index) => {
            const isMe = String(msg.senderId._id) === String(userId);

            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                    isMe
                      ? "bg-success text-success-content"
                      : "bg-base-300 text-gray-200"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] opacity-60 text-right mt-1">
                    {formatTime(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-base-100 bg-base-300">
          <div className="flex gap-3">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="input input-bordered w-full"
            />
            <button
              onClick={sendMessage}
              className="btn btn-success btn-circle"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
