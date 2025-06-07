import "./NewAbout.css";
import NewNavbar from "./NewNavBar";

function NewAbout() {
  return (
    <>
    <NewNavbar/>
    <div className="newabout-container">
      
      <div className="newabout-section">
        <div className="newabout-image">
        <img src="/images/reuse.png" alt="Bag" />

        </div>
        <div className="newabout-text">
          <h2>Reducing Fashion Waste</h2>
          <p>
            In today's fast-paced world, the fashion industry is one of the
            largest contributors to environmental pollution. Millions of tons of
            plastic and textiles are discarded every year. To address this
            issue, EcoThread Exchange provides a platform where users can swap
            their pre-loved clothing and accessories.
          </p>
        </div>
      </div>

     
      <div className="newabout-section reverse">
        <div className="newabout-image">
          <img
            src="https://images.pexels.com/photos/19090/pexels-photo.jpg?cs=srgb&dl=fashion-shoes-footwear-19090.jpg&fm=jpg"
            alt="Shoes"
          />
        </div>
        <div className="newabout-text">
          <h2>Promoting Reusability & Recycling</h2>
          <p>
            Our platform encourages users to swap their gently used clothing and
            accessories, reducing waste and the need for new production.
            Exchanging items helps extend the life of products and decreases
            environmental impact.
          </p>
        </div>
      </div>


      <div className="newabout-section">
        <div className="newabout-image">
          <img
            src="https://www.magestore.com/wp-content/uploads/2020/11/product-exchange-boost-sales.jpg"
            alt="User Platform"
          />
        </div>
        <div className="newabout-text">
          <h2>How It Works</h2>
          <p>
            Users first register on the platform and log in using their email ID
            and password. They can view all available items and list their own
            items for trade. When they find an item they like, they can propose
            a trade. If the other person accepts, the trade is completed, and
            items are removed from the database.
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default NewAbout;
