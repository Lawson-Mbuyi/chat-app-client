import "./assets/message.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
export default function Message({ message, own }) {
  return (
    <div className="messageBlock">
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          {message.messageText ? <p className="messageText">{message.messageText}</p> : ""}
          {message.secureUrl ? (
            <img
              src={message.secureUrl}
              style={{
                objectFit: "cover",
                width: "50px",
                height: "50px",
                margin: "15px",
              }}
              alt=""
            />
          ) : (
            ""
          )}
        </div>
        <div className="messageBottom">
          <ReactTimeAgo date={message.createdAt} locale="en-US" />
        </div>
      </div>
    </div>
  );
}
