import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";

export default function Register() {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const submitImage=()=>{
    const profileImage = new FormData();
    profileImage.append("file",image)
    profileImage.append("uplod_preset","chat-app")
    profileImage.append("cloud_name","dgcubzo0z")

    return fetch("https://api.cloudinary/v1_1/dgcubzo0z/image/upload",{
      method:"post",
      body:"profileImage",
    })
    .then((res)=>res.json())
    .then((profileImage)=>{
      console.log(profileImage)
    }).catch((error)=>{
        console.log(error);
      })
  }


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
  const TextChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast("passwords do not match");
    } else {
      const userData = {
        username,
        email,
        password,
      };
      dispatch(register(userData));
      navigate("/messenger");
    }
  };
  console.log();
  return (
    <>
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
