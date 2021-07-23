import "./sign-in-and-sign-up.styles.scss";
import React from "react";
import SignIn from "../component/sign-in/sign-in.component";

const SignInAndSignUp = (props) => {
  console.log(props);
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignIn />
    </div>
  );
};
export default SignInAndSignUp;
