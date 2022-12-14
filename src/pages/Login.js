import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { login, reset } from "../features/auth/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate("/messenger");
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
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
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
        <p>Login and start the joke</p>
      </section>
      <section className="form">
        <form onSubmit={formSubmit}>
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
            <button type="submit" className="btn-block">
              Login
            </button>
          </div>
        </form>
        <p>
          don&apos;t you have an account? &nbsp;&nbsp;
          <span>
            <Link to="/register">Sign up</Link>
          </span>
        </p>
      </section>
    </>
  );
}
