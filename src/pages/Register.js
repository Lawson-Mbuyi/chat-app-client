import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";

export default function Register() {
  const [file, setFile] = useState();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    profilePicture: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const { username, email, password, password2 } = formData;
  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/");
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //Setting the form changes

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      setFile(selectedFile[0]);
    }
  };

  const TextChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast("passwords do not match");
    } else {
      const profilData = new FormData();
      profilData.append("file", file);
      profilData.append("upload_preset", "chat-app");

      const response = await axios({
        method: "post",
        url: "https://api.cloudinary.com/v1_1/esaie/image/upload",
        data: profilData,
      });
      const profilUrl = response.data["secure_url"];
      const userData = {
        username,
        email,
        password,
        profilePicture: profilUrl,
      };
      dispatch(register(userData));
      navigate("/messenger");
    }
  };
  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">Digital-connect</Link>
        </div>
        <ul>
          {user ? (
            <li>
              <button className="logout">
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          ) : (
            <>
              {" "}
              <li>
                <Link to="/login">
                  <FaSignInAlt />
                  Sign in
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser />
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
      <section className="heading">
        <p>please create an acount</p>
      </section>
      <section className="form">
        <form onSubmit={formSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Enter your username"
              onChange={TextChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={TextChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={TextChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={TextChange}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              id="file"
              className="form-control"
              name="file"
              accept="image/*"
              placeholder="upload your profile"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn-block">
              Register
            </button>
          </div>
        </form>
        <p>
          Do you have an account?
          <span>
            <Link to="/login">Sign in</Link>
          </span>
        </p>
      </section>
    </>
  );
}
