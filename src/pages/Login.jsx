import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/user/login`;
      const response = await axios.post(url, { email, password }, { withCredentials: true });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: "You have successfully logged in ",
        });
        setEmail("");
        setPassword("");
        toast.success("User logged in successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="signup-container">
        <ToastContainer />
        <div className="left-section">
          <img className="signup-image" src="/images/signup.jpg" alt="Signup" />
        </div>

        <div className="right-section">
          <div>
            <h1 className="signup-title">
              Fill what we know <span style={{ color: "#D72638" }}>!</span>
            </h1>
          </div>

          <form onSubmit={userLogin} className="signup-form">
            <div className="form-group">
              <TextField
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                variant="outlined"
                fullWidth={true}
                className="input-field"
                style={{ marginBottom: "10px" }}
              />

              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                fullWidth={true}
                className="input-field"
                style={{ marginBottom: "30px" }}
                InputProps={{
                  endAdornment: (
                    <span onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </span>
                  ),
                }}
              />

              <div className="submit-button">
                <button style={{ marginBottom: "20px" }} className="signup-button">
                  Sign In
                </button>
                <Link to="/" className="signup-link">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
