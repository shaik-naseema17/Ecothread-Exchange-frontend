import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';
import "../styling/ItemDetails.css";

const ItemDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Get the state from navigation
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  // Check if the page was opened from MyItems or MyTrades
  const fromMyItems = location.state?.fromMyItems || false;
  const fromTrade = location.state?.fromTrade || false;

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (!item) {
    return <p>Loading item details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="item-details-container">
        <img src={`http://localhost:3000${item.imageUrl}`} alt={item.title} className="item-image-large" />
        <div className="item-details-content">
          <h2>{item.title}</h2>
          <p>Size: {item.size}</p>
          <p>Condition: {item.condition}</p>
          <p>Preferences: {item.preferences}</p>
          <p><strong>Created By:</strong> {item.createdBy?.username || "Unknown"}</p>
          <p><strong>Email:</strong> {item.createdBy?.email || "Unknown"}</p>

          {/* Only show Propose Trade button if NOT coming from MyItems or MyTrades */}
          {!fromMyItems && !fromTrade && (
            <button onClick={() => navigate(`/trade/${id}`)} className="propose-trade-button">
              Propose Trade
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemDetails;