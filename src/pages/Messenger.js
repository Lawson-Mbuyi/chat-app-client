import "./assets/messenger.css";
import { BiSend } from "react-icons/bi";
import { BsBoxArrowLeft } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { logout, reset } from "../features/auth/authSlice";
import { useEffect, useRef, useState } from "react";
import Chat from "../components/Chat";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import profil from "../images/profil.png";
import Users from "./Users";
import axios from "axios";
const { io } = require("socket.io-client");

function Messenger() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  // const [socket, setSocket] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [ArrivAlMessage, setArrivAlMessage] = useState(null);

  const [newMessageArray, setnewMessageArray] = useState(null);
  const socket = useRef();
  const messageScroll = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000");
    socket.current.on("get-message", (data) => {
      setArrivAlMessage({
        senderId: data.senderId,
        messageText: data.messageText,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    ArrivAlMessage &&
      currentChat?.chaters.includes(ArrivAlMessage.senderId) &&
      setMessages((prev) => [...prev, ArrivAlMessage]);
  }, [ArrivAlMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("add-user", user._id);
    socket.current.on("get-users", (users) => {
      console.log(users);
    });
  }, [user]);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8000");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivAlMessage({
  //       senderId: data.senderId,
  //       messageText: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);
  // useEffect(() => {
  //   ArrivAlMessage &&
  //     currentChat?.chaters.includes(ArrivAlMessage.senderId) &&
  //     setMessages((prev) => [...prev, ArrivAlMessage]);
  // }, [ArrivAlMessage, currentChat]);

  useEffect(() => {
    newMessageArray &&
      currentChat?.users.includes(newMessageArray.senderId) &&
      setnewMessageArray((prev) => [...prev, newMessageArray]);
  }, [newMessageArray, currentChat]);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        const response = await axios.get("/api/chats/" + user._id);
        setChats(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserChats();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get("/api/messages/" + currentChat?._id);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      messageText: newMessage,
      chatId: currentChat._id,
    };
    const receiverId = currentChat.chaters.find((user) => user !== user._id);
    socket.current.emit("send-message", {
      senderId: user._id,
      receiverId,
      messageText: newMessage,
    });

    try {
      const response = await axios.post("/api/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messageScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const getUsers = async () => {
    try {
      const response = await axios.get("api/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="messenger">
      <div className="sideBar">
        <img src={profil} alt="" className="profil" />

        <p
          onClick={getUsers}
          style={{
            width: "60px",
            color: "#FFFF",
            backgroundColor: "#004BE1",
            borderRightStyle: "5px solid #FFE921",
            position: "absolute",
            top: "25%",
            right: 0,
            padding: "5px",
            borderTopLeftRadius: "15px",
            cursor: "pointer",
          }}
        >
          <FaRegCommentDots />
        </p>
        <p
          style={{
            width: "60px",
            color: "#FFFF",
            position: "absolute",
            bottom: "4%",
            left: "35%",
            cursor: "Pointer",
          }}
          onClick={onLogout}
        >
          <BsBoxArrowLeft />
        </p>
      </div>
      <input placeholder="Search users" className="searchInput" />
      <div className="chatMenu">
        {!users ? <p>Rencent</p> : <p>User list</p>}
        {users
          ? users.map((user) => <Users user={user} />)
          : chats.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Chat chat={c} currentUser={user} />
              </div>
            ))}
      </div>
      <div className="chatBox ">
        <div className="chatBoxWrapper">
          <div className="chatBoxTop">
            <div className="userProfil">
              <img src={profil} alt="profil" className="messageImg" />
              <p className="userName">
                Lawson.
                <p>Online</p>
              </p>
            </div>
            {currentChat
              ? messages.map((m) => (
                  <div ref={messageScroll}>
                    <Message message={m} own={m.senderId === user._id} />
                  </div>
                ))
              : ""}
          </div>

          <div className="chatBoxBottom">
            <textarea
              className="chatMessage"
              placeholder="write message"
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            ></textarea>
            <button className="btnSend" onClick={sendMessage}>
              <BiSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
