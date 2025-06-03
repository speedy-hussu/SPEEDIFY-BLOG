import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import Container from "../../components/Container/Container";
import './SignUp.css'
function SignUp() {
  return (
    <Container>
      <div className="sign-up-page-wrapper">
        <SignUpForm />
      </div>
    </Container>
  );
}

export default SignUp;
