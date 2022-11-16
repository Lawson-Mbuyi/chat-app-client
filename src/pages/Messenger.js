/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import "./assets/messenger.css";
import { BiSend } from "react-icons/bi";
import { BsBoxArrowLeft, BsCamera } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputEmoji from "react-input-emoji";
import { toast } from "react-toastify";
import { logout, reset } from "../features/auth/authSlice";
import Chat from "../components/Chat";
import Message from "../components/Message";
import profil from "../images/profil.png";
import Users from "./Users";

const { io } = require("socket.io-client");

function Messenger() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [usersVisibity, setUsersVisibility] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const [ArrivAlMessage, setArrivAlMessage] = useState(null);

  const [newMessageArray, setnewMessageArray] = useState(null);
  const socket = useRef();
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  const fileInputRef = useRef();
  const messageScroll = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    socket.current.on("get-message", (data) => {
      setArrivAlMessage({
        senderId: data.senderId,
        messageText: data.messageText,
        secureUrl: data.secureUrl,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    ArrivAlMessage &&
      currentChat?.chaters.includes(ArrivAlMessage.senderId) &&
      setMessages((prev) => [...prev, ArrivAlMessage]);
  }, [ArrivAlMessage, currentChat]);
  useEffect(() => {
    socket.current.emit("add-user", user._id);
    // eslint-disable-next-line no-unused-vars
    socket.current.on("get-users", (users) => {});
  }, [user]);

  useEffect(() => {
    newMessageArray &&
      currentChat?.users.includes(newMessageArray.senderId) &&
      setnewMessageArray((prev) => [...prev, newMessageArray]);
  }, [newMessageArray, currentChat]);

  useEffect(() => {
    const getUserChats = async () => {
      try {
        const response = await axios.get(`/api/chats/${user._id}`);
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
        const { data } = await axios.get(`/api/messages/${currentChat?._id}`);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    const getCurrentUser = async () => {
      const currentUserId = currentChat.chaters.find((userId) => userId !== user._id);
      try {
        const { data } = await axios.get(`/api/users/${currentUserId}`);
        setCurrentUser(data);
      } catch (error) {
        console.log({ error: "Cet utilisateur n'existe pas" });
      }
    };
    getMessages();
    getCurrentUser();
  }, [currentChat]);
  const uploadData = new FormData();
  uploadData.append("file", image);
  uploadData.append("upload_preset", "chat-app");
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!currentUser) toast("Please choose your correspondant");
    let fileUrl = "";

    if (image) {
      const response = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/esaie/image/upload",
        data: uploadData,
      });
      fileUrl = response.data.secure_url;
    }
    const message = {
      senderId: user._id,
      messageText: newMessage || "",
      chatId: currentChat._id,
      secureUrl: fileUrl || "",
    };
    socket.current.emit("send-message", {
      senderId: user._id,
      receiverId: currentUser._id,
      messageText: newMessage || "",
      secureUrl: fileUrl || "",
    });

    try {
      const response = await axios.post("/api/messages", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    fileInputRef.current.value = "";
    setPreview(null);
    setImage(null);
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
      const response = await axios.get(`/api/users/all/${user._id}`);
      setUsers(response.data);
      setUsersVisibility(true);
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentUserChats = async (senderId, receiverId) => {
    try {
      const { data } = await axios.get(`/api/chats/${senderId}/${receiverId}`);
      if (data.length === 0) {
        try {
          const newChatersId = await axios({
            method: "post",
            url: "/api/chats/",
            data: [senderId, receiverId],
          });
          setCurrentChat(newChatersId.data);
          setUsersVisibility(false);
        } catch (error) {
          console.log({ error: "error" });
        }
      } else {
        setChats(data);
        setUsersVisibility(false);
      }
    } catch (error) {
      console.log({ error: "An error occured" });
    }
  };
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);
  return (
    <div className="messenger">
      <div className="sideBar">
        <img src={user.profilePicture ? user.profilePicture : profil} alt="" className="profil" />

        <p
          onClick={getUsers}
          style={{
            width: "90px",
            color: "#FFFF",
            backgroundColor: "#004BE1",
            borderRight: "5px solid #FFE921",
            position: "absolute",
            top: "25%",
            right: 0,
            padding: "5px",
            borderTopLeftRadius: "15px",
            cursor: "pointer",
          }}
        >
          <FaRegCommentDots
            style={{
              width: "50px",
              height: "50px",
            }}
          />
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
          <BsBoxArrowLeft
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </p>
      </div>
      <input placeholder="Search users" className="searchInput" />
      <div className="chatMenu">
        {!usersVisibity ? <p>Recents</p> : <p>UserList</p>}

        {usersVisibity
          ? users.map((u) => (
              <div role="button" tabIndex="0" onClick={() => getCurrentUserChats(user._id, u._id)}>
                <Users currentUser={u} />
              </div>
            ))
          : chats.map((c) => (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <div onClick={() => setCurrentChat(c)}>
                <Chat chat={c} me={user} />
              </div>
            ))}
      </div>
      <div className="chatBox ">
        <div className="chatBoxWrapper">
          {currentUser ? (
            <div className="userProfil">
              <img
                src={currentUser.profilePicture ? currentUser.profilePicture : profil}
                alt="profil"
                className="messageImg"
              />
              <p className="userName">
                {currentUser.username}
                <p>Online</p>
              </p>
            </div>
          ) : (
            <div className="userProfil">
              <img src={profil} alt="profil" className="messageImg" />
              <p className="userName">
                <p>Choose a chat</p>
              </p>
            </div>
          )}
          <div className="chatBoxTop">
            {currentChat
              ? messages.map((message) => (
                  <div ref={messageScroll}>
                    <Message message={message} own={message.senderId === user._id} />
                  </div>
                ))
              : ""}
          </div>
          {preview ? (
            <img
              src={preview}
              style={{
                objectFit: "cover",
                width: "150px",
                height: "150px",
                display: "flex",
                justifyContent: "center",
              }}
              alt=""
            />
          ) : (
            ""
          )}

          <div className="chatBoxBottom">
            <InputEmoji value={newMessage} onChange={setNewMessage} cleanOnEnter />
            <div className="camera">
              <BsCamera
                onClick={(event) => {
                  event.preventDefault();
                  fileInputRef.current.click();
                }}
              />
            </div>

            <input
              type="file"
              style={{ display: "none" }}
              name="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setImage(file);
                } else {
                  setImage(null);
                }
              }}
            />

            <div role="button" tabIndex="0" className="btnSend" onClick={sendMessage}>
              <BiSend />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
