import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Link, Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "../src/component/header/header.component";
import SignInAndSignUp from "./sign-in-and-sign-up/sign-in-and-sign-up.component";
import React from "react";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import SHOP_DATA from "./pages/shop/shop.data";
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
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      // this.setState({ currentUser: user });
    });
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
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

export default App;
