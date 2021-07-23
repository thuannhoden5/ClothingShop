import React from "react";
import Directory from "../../component/directory/directory.component";
import MenuItem from "../../component/menu-item/menu-item.component";
import "./homepage.styles.scss";

const HomePage = (props) => {
  console.log(props);
  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};
export default HomePage;
