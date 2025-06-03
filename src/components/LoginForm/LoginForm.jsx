import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import { Input } from "../index";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);

  async function logIn(data) {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(loginUser(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(logIn)} className="login-form">
      <h2>Login in to your Account</h2>
      <div className="login-inputs-div">
        <Input
          label={"email"}
          placeholder={"Enter your mail"}
          type={"email"}
          {...register("email", {
            required: true,
            validate: {
              matchPattern: (val) => {
                /[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})/gi.test(
                  val
                ) || "Email address must be a valid address";
              },
            },
          })}
        />
        <Input
          label={"pass"}
          placeholder={"Enter your password"}
          type={"password"}
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <Link to={"/signup"} className="signup-navigator">
        <p>Dont have an account ? Sign-up!</p>
      </Link>
      <div className="login-btn-div">
        <button type="submit" className="sub-btn">
          Login
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}

export default LoginForm;
