import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './NavBar';
import axios from 'axios';


const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    size: '',
    condition: '',
    preferences: '',
    image: null,
  });

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${id}`);
        setFormData({
          title: response.data.title,
          size: response.data.size,
          condition: response.data.condition,
          preferences: response.data.preferences,
        });
      } catch (error) {
        console.error('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', formData.title);
    form.append('size', formData.size);
    form.append('condition', formData.condition);
    form.append('preferences', formData.preferences);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:3000/api/items/${id}`, form);
      navigate('/my-items');
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="edit-item-container">
        <h2>Edit Item</h2>
        <form onSubmit={handleSubmit} className="edit-item-form">
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Size:
            <input
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Condition:
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Preferences:
            <input
              type="text"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Image:
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <button type="submit" className="save-button">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditItem;
