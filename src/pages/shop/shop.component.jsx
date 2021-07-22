import "./shop.styles.scss";
import React from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../component/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = {
      collections: SHOP_DATA,
    };
  }
  render() {
    const { collections } = this.state;
    return (
      <div>
        <div className="shop-page">
          {collections.map(({ id, ...otherCollectionProps }) => (
            <CollectionPreview key={id} {...otherCollectionProps} />
          ))}
        </div>
      </div>
    );
  }
}

export default ShopPage;
