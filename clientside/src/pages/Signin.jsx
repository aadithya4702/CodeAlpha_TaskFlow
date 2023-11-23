import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

Axios.defaults.baseURL = "http://localhost:4000/api";
Axios.defaults.withCredentials = true;

const Signin = () => {
  const [signup, setSignup] = useState(false);
  const [otpverifyshow, setotpverifyshow] = useState(true);
  const [otpFields, setOtpFields] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const clearUserData = () => {
    setUser({
      name: "",
      email: "",
      password: "",
    });
    setOtpFields(["", "", "", "", "", ""]);
  };

  //otp
  const handleChange = (index, value) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = value;

    if (value !== "" && index < otpFields.length - 1) {
      // Move to the next input field
      document.getElementById(`otp_val_${index + 1}`).focus();
    }

    setOtpFields(newOtpFields);
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      // Clear the value in the current input field
      const newOtpFields = [...otpFields];
      newOtpFields[index] = "";

      // Move to the previous input field
      if (index > 0) {
        document.getElementById(`otp_val_${index - 1}`).focus();
      }

      setOtpFields(newOtpFields);
    }
  };

  //otp validation
  const handleotpvalidation = async () => {
    try {
      const { name, email, password } = user;
      const otp = otpFields.join("");
      const response = await Axios.post("/users/otpvalidation", {
        otp: otp,
        email,
        name,
        password,
      });

      if (response.status === 200) {
        toast.success("E-Mail verified", {
          position: toast.POSITION.TOP_RIGHT,
        });
        clearUserData(); // Clear user data after successful verification
        setSignup(!signup);
        setotpverifyshow(!otpverifyshow);
      } else {
        const errorMessage = response.data.message || "Unknown error occurred";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      const errorMessage =
        error.response?.data.message || "Unknown error occurred";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const toggleSignup = () => {
    setSignup(!signup);
    clearUserData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;

    if (signup) {
      if (password.length < 8) {
        toast.error("Provide a strong password!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        try {
          // Make an Axios POST request to your sign-up API endpoint
          const response = await Axios.post("/users/", {
            name,
            email,
            password,
          });

          // Check the response status and display a success or error toast
          if (response.status === 200) {
            toast.success("OTP has sent to the mail!", {
              position: toast.POSITION.TOP_RIGHT,
            });

            setotpverifyshow(!otpverifyshow);
          } else {
            toast.error("Registration failed", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          // Check if the error is an Axios error with a response
          if (error.response) {
            const { status, data } = error.response;

            if (status === 409) {
              // User already exists
              toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              // Other status codes, display a generic error message
              toast.error("Registration failed", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            // Network error or other issues
            toast.error("Error during registration", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    } else {
      try {
        const { email, password } = user;
        const response = await Axios.post("/users/login", {
          email,
          password,
        });

        if (response.status === 200) {
          // Successful login, handle the token or redirect
          const token = response.data.token;
          // You can save the token in local storage or a cookie for future requests
          if (token) {
            localStorage.setItem("token", token);
          }
          // console.log("Logged in successfully, token:", token);
          toast.success("Welcome Back User:)", {
            position: toast.POSITION.TOP_RIGHT,
          });

          navigate("/home");
        } else {
          const errorMessage = response.data.message; 
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        // Check if the error is an Axios error with a response
        if (error.response) {
          const { status, data } = error.response;

          if (status === 401 || status === 404) {
            // Handle specific response status codes
            const errorMessage = data.message;
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            // Other status codes, display a generic error message
            toast.error("Error during login", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } else {
          // Network error or other issues
          console.error("Error during login:", error);
          toast.error("Error during login", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  return (
    <div className="h-screen bg-gray-500 flex items-center justify-center flex-col">
      {otpverifyshow ? (
        <div className="items-center justify-center flex flex-col gap-6 bg-gray-300 shadow-lg p-5 rounded">
          <h3 className="text-2xl text-black font-bold ">
            {signup ? "Create an account 😎" : "Welcome Back 👋"}
          </h3>
          {!signup ? (
            <form
              action=""
              onSubmit={handleSubmit}
              className="gap-5 flex flex-col"
            >
              <div className="relative mb-3 inputfield">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  required
                  onChange={handleInputChange}
                  className="input"
                />
                <span>Email address</span>
              </div>
              <div className="relative mb-3 inputfield">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  required
                  onChange={handleInputChange}
                  className="input"
                />
                <span>Password</span>
              </div>
              <button
                className="px-6 py-2 text-sm rounded shadow bg-green-600 hover:bg-green-200 hover:text-black text-white"
                type="submit"
                role="button"
              >
                Log in
              </button>
            </form>
          ) : (
            <form
              action=""
              className="gap-5 flex flex-col"
              onSubmit={handleSubmit}
            >
              <div className="relative mb-3 inputfield">
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  required
                  onChange={handleInputChange}
                  className="input"
                />
                <span>
                  UserName<sup>*</sup>
                </span>
              </div>

              <div className="relative mb-3 inputfield">
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  required
                  onChange={handleInputChange}
                  className="input"
                />
                <span>
                  Email address<sup>*</sup>
                </span>
              </div>

              <div className="relative mb-3 inputfield">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  required
                  onChange={handleInputChange}
                  className="input"
                />
                <span>
                  Password<sup>*</sup>
                </span>
              </div>
              <button
                className="px-6 py-2 text-sm rounded shadow bg-green-600 hover:bg-green-200 hover:text-green-600 text-black"
                type="submit"
                role="button"
              >
                Sign up
              </button>
            </form>
          )}
          <p>
            {signup ? "Already have an account? " : "Don't have an account? "}
            <label
              className="text-green-600 hover:text-green-400"
              onClick={toggleSignup}
            >
              {signup ? "Sign in" : "Sign up"}
            </label>
          </p>
        </div>
      ) : (
        <div className="  flex flex-col gap-6 bg-slate-300 shadow-lg p-5 rounded">
          <div
            className="flex justify-end hover:text-red-600"
            onClick={() => setotpverifyshow(!otpverifyshow)}
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
          <h3 className="">Enter the OTP:</h3>
          <div className="flex space-x-2">
            {otpFields.map((value, index) => (
              <input
                key={index}
                type="text"
                id={`otp_val_${index}`}
                className="w-10 h-10 text-center"
                maxLength={1}
                min="0"
                max="9"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <button
            className="px-6 py-2 text-sm rounded shadow bg-green-600 hover:bg-green-200 hover:text-green-600 text-black"
            onClick={handleotpvalidation}
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Signin;
