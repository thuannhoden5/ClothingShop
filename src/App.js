import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import { Link, Route, Switch } from "react-router-dom";
import ShopPage from "./pages/shop/shop.component";
import Header from "../src/component/header/header.component";
import SignInAndSignUp from "./sign-in-and-sign-up/sign-in-and-sign-up.component";
import React from "react";
import { auth } from "./firebase/firebase.utils";
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
    auth.onAuthStateChanged((user) => {
      this.setState({ currentUser: user });
      console.log(user);
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
