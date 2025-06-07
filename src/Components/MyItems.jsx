import { useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "./NavBar";
import '../styling/MyItems.css';

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/items/my-items", { withCredentials: true });

                if (Array.isArray(response.data)) {
                    setItems(response.data);
                } else {
                    setItems([]);
                    console.error("API response is not an array:", response.data);
                }
            } catch (err) {
                setError(err.response?.data?.message || "Error fetching items");
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this item?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:3000/api/items/${id}`, { withCredentials: true });
            setItems(items.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div>
            <Navbar />
            <div className="container">
                <h2 className="title">My Items</h2>

                {/* Create Item Button */}
                <div className="header">
                    <Link to="/add-item" className="create-item-link">
                        <button className="create-item-button">Create a New Item</button>
                    </Link>
                </div>

                {items.length === 0 ? (
                    <p className="no-items">No items found.</p>
                ) : (
                    <div className="items-grid">
                        {items.map(item => (
                            <div key={item._id} className="item-card">
                                <img
                                    src={`http://localhost:3000${item.imageUrl}`}
                                    alt={item.title}
                                    className="item-image"
                                    onError={(e) => (e.target.style.display = "none")} // Hide broken images
                                />
                                <div className="item-details">
                                    <h3>{item.title}</h3>
                                    <p><strong>Size:</strong> {item.size}</p>
                                    <p><strong>Condition:</strong> {item.condition}</p>
                                    <p><strong>Preferences:</strong> {item.preferences}</p>
                                    <p><strong>Created By:</strong> {item.createdBy?.username || "Unknown"}</p>
                                    <p><strong>Email:</strong> {item.createdBy?.email || "Unknown"}</p>

                                    {/* Edit, Delete, and View Details Buttons */}
                                    <Link to={`/item/${item._id}`} state={{ fromMyItems: true }}>
                                        <button className="view-item-button">View Details</button>
                                    </Link>
                                    <Link to={`/edit-item/${item._id}`}>
                                        <button className="edit-item-button">Edit</button>
                                    </Link>
                                    <button 
                                        className="delete-item-button" 
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyItems;