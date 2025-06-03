import React from "react";
import { Container, LoginForm } from "../../components";
import "./Login.css";
function Login() {
  return (
    <Container>
      <div className="login-page-wrapper">
        <LoginForm />
      </div>
    </Container>
  );
}

export default Login;
