import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styling/MyTrades.css";

const MyTrades = () => {
  const [trades, setTrades] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/me", {
          withCredentials: true,
        });
        setCurrentUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchTrades = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/trades/my-trades", {
          withCredentials: true,
        });
        setTrades(response.data);
      } catch (error) {
        console.error("Error fetching trades:", error);
      }
    };

    fetchUser();
    fetchTrades();
  }, []);

  // Navigate to Item Details page when button is clicked
  const handleViewItemDetails = (itemId) => {
    navigate(`/item/${itemId}`, { state: { fromTrade: true } });
  };

  // Handle accepting a trade
  const handleAcceptTrade = async (tradeId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/trades/${tradeId}/accept`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Remove the accepted trade from the list
        setTrades(trades.filter((trade) => trade._id !== tradeId));
        alert("Trade accepted successfully!");
      }
    } catch (error) {
      console.error("Error accepting trade:", error);
      alert("Failed to accept trade. Please try again.");
    }
  };

  // Handle rejecting a trade
  const handleRejectTrade = async (tradeId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/trades/${tradeId}/reject`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Update the trade status in the list
        setTrades(
          trades.map((trade) =>
            trade._id === tradeId ? { ...trade, status: "rejected" } : trade
          )
        );
        alert("Trade rejected successfully!");
      }
    } catch (error) {
      console.error("Error rejecting trade:", error);
      alert("Failed to reject trade. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="my-trades-container">
        <h2>My Trades</h2>
        <div>
          {trades.map((trade) => (
            <div className="trade-card" key={trade._id}>
              <h3>Trade ID: {trade._id}</h3>
              <p className="trade-description">
                Trade <span className="highlight">{trade.requestedItem?.title || "Unknown Item"}</span> 
                for <span className="highlight">{trade.proposedItem?.title || "Unknown Item"}</span>
              </p>
              <p>
                Proposed By: <span className="highlight">{trade.proposedBy?.username || "Unknown User"}</span>
              </p>
              <p>
                Proposed To: <span className="highlight">{trade.proposedTo?.username || "Unknown User"}</span>
              </p>
              <p>
                Proposed Item: 
                <span className="highlight"> {trade.proposedItem?.title || "Unknown Item"}</span>
                {trade.proposedItem && (
                  <button onClick={() => handleViewItemDetails(trade.proposedItem._id)} className="view-details-button">
                    View Details
                  </button>
                )}
              </p>
              <p>
                Requested Item: 
                <span className="highlight"> {trade.requestedItem?.title || "Unknown Item"}</span>
                {trade.requestedItem && (
                  <button onClick={() => handleViewItemDetails(trade.requestedItem._id)} className="view-details-button">
                    View Details
                  </button>
                )}
              </p>
              <p>
                Status: <span className="highlight">{trade.status}</span>
              </p>
              {currentUserId === trade.proposedTo?._id && trade.status === "pending" && (
                <div className="trade-actions">
                  <button onClick={() => handleAcceptTrade(trade._id)} className="accept-button">
                    Accept
                  </button>
                  <button onClick={() => handleRejectTrade(trade._id)} className="reject-button">
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyTrades;