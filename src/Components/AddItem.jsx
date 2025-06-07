import React, { useState } from "react";
import Navbar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Cards2.css";

const AddItem = () => {
    const [item, setItem] = useState({
        title: "",
        size: "",
        condition: "",
        preferences: "",
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        const validSizes = ["S", "M", "L", "XL", "XXL","32","7","8","6"];
        const validConditions = ["Like New", "Good", "Fair", "Poor"];

        if (!item.title.trim()) newErrors.title = "Title is required.";
        if (!item.size.trim() || !validSizes.includes(item.size.trim().toUpperCase()))
            newErrors.size = `Size must be one of ${validSizes.join(", ")}.`;
        if (!item.condition.trim() || !validConditions.includes(item.condition.trim()))
            newErrors.condition = `Condition must be one of ${validConditions.join(", ")}.`;
        if (!item.preferences.trim() || item.preferences.trim().length < 10)
            newErrors.preferences = "Preferences must be at least 10 characters.";
        if (!image) newErrors.image = "Image is required.";
        else if (!["image/jpeg", "image/png"].includes(image.type))
            newErrors.image = "Image must be JPG or PNG.";
        else if (image.size > 10 * 1024 * 1024)
            newErrors.image = "Image size must be under 10MB.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
    
        const formData = new FormData();
        formData.append("title", item.title);
        formData.append("size", item.size);
        formData.append("condition", item.condition);
        formData.append("preferences", item.preferences);
        formData.append("image", image); // Ensure the key matches backend field name
    
        try {
            const response = await axios.post("http://localhost:3000/api/items/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Item created successfully!");
            navigate("/my-items");
        } catch (error) {
            console.error("Error creating item:", error);
            alert(error.response?.data?.message || "Failed to create item.");
        }
    };
    

    return (
        <>
            <Navbar />
            <div className="trades-container">
                <form onSubmit={handleSubmit} className="item-form">
                    <h1 className="trades-heading">Create New Item</h1>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" value={item.title} onChange={handleChange} />
                        {errors.title && <p className="error-message">{errors.title}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Size:</label>
                        <input type="text" id="size" name="size" value={item.size} onChange={handleChange} />
                        {errors.size && <p className="error-message">{errors.size}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="condition">Condition:</label>
                        <input type="text" id="condition" name="condition" value={item.condition} onChange={handleChange} />
                        {errors.condition && <p className="error-message">{errors.condition}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="preferences">Preferences:</label>
                        <input type="text" id="preferences" name="preferences" value={item.preferences} onChange={handleChange} />
                        {errors.preferences && <p className="error-message">{errors.preferences}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Upload Image:</label>
                        <input type="file" id="image" onChange={handleImageChange} />
                        {errors.image && <p className="error-message">{errors.image}</p>}
                    </div>
                    <button type="submit" className="submit-button">Post</button>
                </form>
            </div>
        </>
    );
};

export default AddItem;
