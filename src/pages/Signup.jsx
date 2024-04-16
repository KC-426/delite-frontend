import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Signup.css";
import Swal from "sweetalert2";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const userSignup = async (e) => {
    e.preventDefault();
    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/user/signup`;
      const response = await axios.post(
        url,
        { firstName, lastName, email, password, confirmPassword },
        { withCredentials: true }
      );

      if (response.data.success) {
        setShowOtpPopup(true);
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: "Please check your email to verify",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign up profile", {
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

  const verifyOtp = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_BASE_URL}/verify/email`;
      const response = await axios.post(url, { email, otp });

      if (response.data.success) {
        setShowOtpPopup(false);
        navigate(`/login`);
        toast.success("Email verified successfully ", {
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
      toast.error("Failed to verify OTP", {
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
        {showOtpPopup && <div className="signup-overlay" />}

        <div className="left-section">
          <img className="signup-image" src="/images/signup.jpg" alt="Signup" />
        </div>

        <div className="right-section">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="signup-title">
              Let us know <span style={{ color: "#D72638" }}>!</span>
            </h1>
            <Link
              to={"/login"}
              style={{
                fontSize: "25px",
                textDecoration: "none",
                marginTop: '20px'
              }}
              className="signup-title"
            >
            <b>Sign <span style={{ color: "#D72638" }}>In</span></b>  
            </Link>
          </div>

          <div
            className={`signup-form-container ${showOtpPopup ? "blur" : ""}`}
          >
            <form onSubmit={userSignup} className="signup-form">
              <div className="form-group">
                <div className="name-inputs">
                  <TextField
                    id="firstName"
                    type="text"
                    fullWidth={true}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    label="First Name"
                    variant="outlined"
                    className="input-field"
                  />

                  <TextField
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label="Last Name"
                    variant="outlined"
                    className="input-field"
                  />
                </div>

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
                  style={{ marginBottom: "10px" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <TextField
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth={true}
                  className="input-field"
                  style={{ marginBottom: "30px" }}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />

                <div className="submit-button">
                  <button className="signup-button">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {showOtpPopup && (
        <div className="otp-popup">
          <div className="otp-popup-content">
            <h2>Verify OTP</h2>
            <TextField
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              label="Enter OTP"
              variant="outlined"
              fullWidth={true}
              InputLabelProps={{ style: { color: "white" } }}
              InputProps={{
                style: {
                  color: "white",
                  borderColor: "white",
                },
                className: "otp-input-field",
              }}
              className="otp-input-field"
              style={{ marginBottom: "20px" }}
            />
            <button
              className="verify-otp-button signup-button"
              onClick={verifyOtp}
            >
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
