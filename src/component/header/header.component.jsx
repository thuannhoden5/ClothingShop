import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  // console.log(currentUser);
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <h1 className="header-title">Pac1Thing</h1>
        <img
          src="https://image.flaticon.com/icons/png/32/459/459464.png"
          alt=""
        />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};
export default Header;
