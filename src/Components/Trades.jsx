import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import axios from "axios";
import "../Cards2.css";

const Trades = () => {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [myItems, setMyItems] = useState([]);
  const [selectedMyItemIndex, setSelectedMyItemIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch the selected item (other user's item)
        const selectedItemResponse = await axios.get(`http://localhost:3000/api/items/${id}`, {
          withCredentials: true, // Include cookies
        });
        setSelectedItem(selectedItemResponse.data);

        // Fetch user's own items
        const myItemsResponse = await axios.get("http://localhost:3000/api/items/my-items", {
          withCredentials: true, // Include cookies
        });

        setMyItems(myItemsResponse.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [id]);

  const handleNextItem = () => {
    setSelectedMyItemIndex((prevIndex) => (prevIndex + 1) % myItems.length);
  };

  const handleProposeTrade = async () => {
    if (myItems.length === 0) {
      alert("You have no items to trade.");
      return;
    }

    const selectedMyItem = myItems[selectedMyItemIndex]._id;

    try {
      await axios.post(
        "http://localhost:3000/api/trades/propose",
        {
          proposedTo: selectedItem.createdBy._id,
          proposedItem: id,
          requestedItem: selectedMyItem,
        },
        {
          withCredentials: true, // Include cookies
        }
      );
      alert("Trade proposed successfully!");
      navigate("/trades");
    } catch (error) {
      console.error("Error proposing trade:", error);
      alert("Failed to propose trade.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="trade-container">
        <h1>Propose a Trade</h1>
        <div className="trade-boxes">
          {/* LEFT SIDE: Selected Item (Other User's Item) */}
          <div className="trade-box left">
            <h2>Selected Item</h2>
            {selectedItem && (
              <div className="item-details">
                <img
                  src={`http://localhost:3000${selectedItem.imageUrl}`}
                  alt={selectedItem.title}
                  className="item-image"
                />
                <h3>{selectedItem.title}</h3>
                <p>Size: {selectedItem.size}</p>
                <p>Condition: {selectedItem.condition}</p>
                <p>Preferences: {selectedItem.preferences}</p>
                <p><strong>Created By:</strong> {selectedItem.createdBy?.username || "Unknown"}</p>
                <p><strong>Email:</strong> {selectedItem.createdBy?.email || "Unknown"}</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDE: User's Own Items (Scrollable) */}
          <div className="trade-box right">
            <h2>Your Items</h2>
            {myItems.length > 0 ? (
              <div className="item-details">
                <img
                  src={`http://localhost:3000${myItems[selectedMyItemIndex].imageUrl}`}
                  alt={myItems[selectedMyItemIndex].title}
                  className="item-image"
                />
                <h3>{myItems[selectedMyItemIndex].title}</h3>
                <p>Size: {myItems[selectedMyItemIndex].size}</p>
                <p>Condition: {myItems[selectedMyItemIndex].condition}</p>
                <p>Preferences: {myItems[selectedMyItemIndex].preferences}</p>
                <p><strong>Created By:</strong> {myItems[selectedMyItemIndex].createdBy?.username || "Unknown"}</p>
                <p><strong>Email:</strong> {myItems[selectedMyItemIndex].createdBy?.email || "Unknown"}</p>
                <button onClick={handleNextItem} className="next-item-button">
                  Next Item
                </button>
              </div>
            ) : (
              <p>No items available for trade.</p>
            )}
          </div>
        </div>
        <button onClick={handleProposeTrade} className="propose-trade-button">
          Propose Trade
        </button>
      </div>
    </>
  );
};

export default Trades;