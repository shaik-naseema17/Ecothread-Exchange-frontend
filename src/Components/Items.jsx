import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';
import '../Cards1.css';

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('https://e-backend-1jgc.onrender.com/api/items', {
          withCredentials: true, // ✅ Include cookies in request
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <div className="items-container">
        <div className="items-list">
          {items.map((item) => (
            <div key={item._id} className="item-box">
              <img
                src={item.imageUrl} // ✅ Cloudinary URL used directly
                alt={item.title}
                className="item-image"
                onError={(e) => (e.target.style.display = 'none')} // Optional fallback
              />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p>Size: {item.size}</p>
                <p>Condition: {item.condition}</p>
                <p>Preferences: {item.preferences}</p>
                <p><strong>Created By:</strong> {item.createdBy?.username || "Unknown"}</p>
                <p><strong>Email:</strong> {item.createdBy?.email || "Unknown"}</p>
                
                <Link to={`/item/${item._id}`}>
                  <button className="view-item-button">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;
