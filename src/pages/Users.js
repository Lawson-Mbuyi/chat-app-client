
export default function users({user}) {
  return (
    <div className="recentChats">
      <div className="recent">
        <img
          className="chatImg"
          src={user.coverPicture ?user.coverPicture :"" }
          alt="profil"
        />
        <span className="chatName">{user.username }</span>
      </div>
    </div>
  );
}
