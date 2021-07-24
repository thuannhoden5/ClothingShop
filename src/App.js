import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Link, Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "../src/component/header/header.component";
import SignInAndSignUp from "./sign-in-and-sign-up/sign-in-and-sign-up.component";
import React from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SHOP_DATA from "./pages/shop/shop.data";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";
// const HomePage = (props) => {
//   console.log(props);
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
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data(),
          });
        });
      }
      setCurrentUser({ currentUser: userAuth });
    });
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
          {/* <Route exact path="/topics" component={TopicList} />
        <Route path="/topics/:topicId" component={TopicDetail} /> */}
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(null, mapDispatchToProps)(App);
