import React from "react";
import "./NewHome.css";
import NewNavbar from "./NewNavBar";
import FAQ from "./FAQ";

function NewHome() {
  return (
    <>
      <NewNavbar />
      <div className="newhome-container">
        <div className="newhome-banner">
          <h1>Welcome to EcoThread Exchange</h1>
          <img src="https://wallpaperset.com/w/full/0/d/5/183330.jpg" alt="Banner" />
        </div>
        <h2>See what things you can trade</h2>
        <div className="newhome-items-grid">
          <div className="newhome-item">
            <img src="http://bensbargains.net/thecheckout/wp-content/uploads/2013/07/bags_herschel.jpg" alt="Bag" />
          </div>
          <div className="newhome-item">
            <img src="https://rolexwatchtrader.co.uk/wp-content/uploads/2019/10/DSC_0148.jpg" alt="Watch" />
          </div>
          <div className="newhome-item">
            <img src="https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=fashion-shoes-footwear-19090.jpg&fm=jpg" alt="Shoes" />
          </div>
          <div className="newhome-item">
            <img src="https://i5.walmartimages.com/asr/c479d902-4093-46fb-9025-80501dc5958b_2.d30a9d6cd3f0327b4f57c4bbd5dfa016.jpeg" alt="Books" />
          </div>
          <div className="newhome-item">
            <img src="https://www.handbagfashion.com/images/product/detail/060615-PAP139.JPG" alt="Bag" />
          </div>
        </div>
        <FAQ /> {/* Add the FAQ section here */}
        <footer className="newhome-footer">
  <p>© 2025 EcoThread Exchange. All rights reserved.</p>
</footer>

      </div>
    </>
  );
}

export default NewHome;
