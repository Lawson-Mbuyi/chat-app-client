import profil from "../images/profil.png";
import "./assets/mess.css"

const Mess = () => {
  return (
    <div className="container-message">
      <div className="message">
        <div className="my-image">
          <img
            src={profil}
            alt="profil"
            title="profil"
            className="my_profil_msg"
          />
          <div className="Online">
            <div className="online-name">Jeannot</div>
            <div className="if-online">Online</div>
          </div>
        </div>
        <hr className="list-hr"></hr>
        <div className="list-message">
          <div className="blog-msg-left">
            <div className="left">
              <span className="my-msge-sended">Salut!</span>
              <div className="date">Date</div>
            </div>
          </div>
          <div className="blog-msg-right">
            <div className="right">
              <span className="my-msge-sended ">comment tu vas ?</span>
              <div className="date">Date</div>
            </div>
          </div>
        </div>

        <form className="form">
          <hr></hr>
          <input type="text" placeholder="" />
          <button>send</button>
        </form>
      </div>
    </div>
  );
};

export default Mess;