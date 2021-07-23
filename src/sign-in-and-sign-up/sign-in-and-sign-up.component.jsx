import "./sign-in-and-sign-up.styles.scss";
import React from "react";
import SignIn from "../component/sign-in/sign-in.component";
import SignUp from "../component/sign-up/sign-up.component";

const SignInAndSignUp = (props) => {
  // console.log(props);
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};
export default SignInAndSignUp;
