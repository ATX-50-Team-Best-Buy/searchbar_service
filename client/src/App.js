import React, { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";
import SearchResults from "./components/SearchResults";
import {
  ShoppingCart,
  Store,
  AccountCircle,
  ExpandMore,
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import axios from "axios";

const App = () => {
  const [options, setOptions] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //should pull mock data and store in state as an array
  useEffect(() => {
    axios
      .get(`http://ec2-3-21-126-245.us-east-2.compute.amazonaws.com/products`)
      .then((res) => {
        setOptions(res.data);
      })
      .catch((err) => {
        console.log(`Axios error getting all products: ${err}`);
      });
  }, []);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // should query database for relevant search results
  const handleSearchSubmit = (e) => {
    e.preventDefault();

    let query = searchText;

    axios
      .get(
        `http://ec2-3-21-126-245.us-east-2.compute.amazonaws.com/products/${query}`
      )
      .then((res) => {
        setSearchResults(res.data);
      })
      .catch((err) => {
        console.log(`Axios error getting all products: ${err}`);
      });
  };

  // should return id of selected product name
  const handleProductSelect = (e) => {
    if (!e.target.value) {
      return;
    }

    let name = e.target.value;
    let product = options.filter((option) => option.name === name);

    if (product.length === 0) {
      return;
    } else {
      // updates divs with product id for product and reviews components
      document.getElementById("searchbar_app").className = product[0].uniqueID;
      console.log(product[0].uniqueID);
    }
  };

  return (
    <div>
      <div className="header">
        <div className="logo">
          <img
            id="logo"
            src="https://pisces.bbystatic.com/image2/BestBuy_US/Gallery/bby_logo-82846.png"
            alt="BestBuy logo"
          />
        </div>
        <div className="middleNav">
          <Searchbar
            options={options}
            handleProductSelect={handleProductSelect}
            handleChange={handleChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </div>
        <div className="middleRightNav">
          <div id="store">
            <IconButton color="inherit">
              <Store id="storeBtn" />
            </IconButton>
            HRATX50
          </div>
          <div id="cart">
            <IconButton color="inherit">
              <ShoppingCart id="cartBtn" />
            </IconButton>
            Cart
          </div>
        </div>
        <div className="upperRightContainer">
          <div>Credit Cards</div>
          <div>Top Deals</div>
          <div>Deal of the Day</div>
          <div>Gift Cards</div>
          <div>For Your Business</div>
          <div>Back to School</div>
        </div>
      </div>
      <div className="lowerNav">
        <div className="lowerLeftNav">
          <div>
            Products
            <ExpandMore style={{ fontSize: 15 }} />
          </div>
          <div>
            Brands
            <ExpandMore style={{ fontSize: 15 }} />
          </div>
          <div>
            Deals
            <ExpandMore style={{ fontSize: 15 }} />
          </div>
          <div>
            Services
            <ExpandMore style={{ fontSize: 15 }} />
          </div>
        </div>
        <div className="lowerRightNav">
          <div>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            Account
            <ExpandMore style={{ fontSize: 13 }} />
          </div>
          <div>
            Recently Viewed
            <ExpandMore style={{ fontSize: 13 }} />
          </div>
          <div>
            Order Status
            <ExpandMore style={{ fontSize: 13 }} />
          </div>
          <div>Saved Items</div>
        </div>
      </div>
      <SearchResults searchResults={searchResults} />
    </div>
  );
};

export default App;
