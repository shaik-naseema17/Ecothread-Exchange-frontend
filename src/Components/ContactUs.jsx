import React from "react";
import "./ContactUs.css";
import NewNavbar from "./NewNavBar";

const ContactUs = () => {
  return (
    <>
    <NewNavbar/>
    <div className="contactus-container">
      {/* Left Side: Contact Image */}
      <div className="contactus-image">
        <img
          src="http://st.depositphotos.com/2309453/2649/i/450/depositphotos_26492671-stock-photo-contact-us.jpg"
          alt="Contact Us"
        />
      </div>

      {/* Right Side: Contact Information */}
      <div className="contactus-info">
        <h2>Contact Us</h2>
        <p>
          If you have any questions, feel free to reach out to us. Our team is here to help!
        </p>

        <h3>Our Team</h3>
        <div className="contactus-team">
          <div className="team-member">
            <strong>Shaik Naseema</strong>
            <p>Email: naseema@example.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
          <div className="team-member">
            <strong>Soupati Navya</strong>
            <p>Email: navya@example.com</p>
            <p>Phone: +91 98765 43211</p>
          </div>
          <div className="team-member">
            <strong>Meghana</strong>
            <p>Email: meghana@example.com</p>
            <p>Phone: +91 98765 43212</p>
          </div>
          <div className="team-member">
            <strong>Hemanth</strong>
            <p>Email: hemanth@example.com</p>
            <p>Phone: +91 98765 43213</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactUs;
