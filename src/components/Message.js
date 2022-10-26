import "./assets/message.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
export default function Message({ message, own }) {
  console.log(message);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.messageText}</p>
      </div>
      <div className="messageBottom">
        <ReactTimeAgo date={message.createdAt} locale="en-US" />
      </div>
    </div>
  );
}
