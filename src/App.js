import "./App.css";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/homepage.component";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "../src/component/header/header.component";
import SignInAndSignUp from "./sign-in-and-sign-up/sign-in-and-sign-up.component";
import React from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SHOP_DATA from "./redux/shop/shop.data";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";
// const HomePage = (props) => {
//   consol e.log(props);
//   return (
//     <div>
//       <button
//         onClick={() => {
//           props.history.push("/topics");
//         }}
//       >
//         Topics
//       </button>
//       {/* <Link to="/topics">Topics</Link> */}
//       <h1>This is HOMEPAGE</h1>
//     </div>
//   );
// };

// const TopicList = (props) => {
//   console.log(props);
//   return <div>Topic list ne</div>;
// };
// const TopicDetail = (props) => {
//   console.log(props);
//   return <h1>Topic details</h1>;
// };

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInAndSignUp />
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
