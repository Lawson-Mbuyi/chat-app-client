import profil from "../images/profil.png";

export default function users({ currentUser}) {
  return (
    <div className="recentChats">
        <img
          className="chatImg"
          src={currentUser.profilePicture ? currentUser.profilePicture : profil}
          alt="profil"
        />
        <span className="chatName">{currentUser.username}</span>
      </div>
  );
}
