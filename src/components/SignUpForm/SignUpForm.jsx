import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import { useForm } from "react-hook-form";
import "./SignUpForm.css";

function SignUpForm() {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const signUp = async (data) => {
    setError("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const curUser = await authService.getCurrentUser();
        if (curUser) {
          dispatch(loginUser(curUser));
          navigate("/");
        }
      }
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(signUp)} className="sign-up-form">
      <h2>Sign-Up</h2>
      <div className="sign-up-inputs-div">
        <Input
          label={"Name"}
          placeholder={"Enter your name"}
          {...register("Name", {
            required: true,
          })}
        />
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
          placeholder={"Enter the password"}
          type={"password"}
          {...register("password", {
            required: true,
          })}
        />
      </div>
      <div className="sign-up-btn-div">
        <button type="submit" className="sub-btn">
          Sign Up
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}

export default SignUpForm;
