import "./assets/chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import profil from "../images/profil.png";

export default function Chat({ chat, currentUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const correspondantUserId = chat.chaters.find(
      (userId) => userId !== currentUser._id
    );
    const getCorrespondantUser = async () => {
      try {
        const correspondantUsers = await axios.get(
          `/api/users/${correspondantUserId}`
        );
        setUser(correspondantUsers);
      } catch (error) {
        console.log({ error: "This user doesn't exists" });
      }
    };
    getCorrespondantUser();
  }, [chat, currentUser]);
  return (
    <div className="recentChats">
      <div className="recent">
        <img
          className="chatImg"
          src={user ? user.data.profilePicture : profil}
          alt="profil"
        />
        <span className="chatName">{user ? user.data.username : ""}</span>
      </div>
    </div>
  );
}
