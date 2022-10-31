import "./assets/chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import profil from "../images/profil.png";

export default function Chat({ chat, me }) {
  const [correspondant, setCorrespondant] = useState(null);

  const getCorrespondantUser = async () => {
    const myCorrespondantId = chat.chaters.find((userId) => userId !== me._id);
    try {
      const { data } = await axios.get(`/api/users/${myCorrespondantId}`);
      setCorrespondant(data);
    } catch (error) {
      console.log({ error: "This user doesn't exists" });
    }
  };

  useEffect(() => {
    getCorrespondantUser();
  }, [chat, me]);
  return (
    <div className="recentChats">
      {correspondant ? (
        <div className="recent">
          <img
            className="chatImg"
            src={correspondant.profilePicture ? correspondant.profilePicture : profil}
            alt="profil"
          />
          <span className="chatName">{correspondant ? correspondant.username : ""}</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
