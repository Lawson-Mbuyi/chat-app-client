import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Dashbord from "./pages/Dashbord";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Upload from "./components/Upload";
import Messenger from "./pages/Messenger";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" index  element={<Dashbord />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />

          {user && <Route path="/messenger" element={<Messenger />} />}
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
