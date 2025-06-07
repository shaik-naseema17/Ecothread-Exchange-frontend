import React, { useState } from "react";
import "../Components/FAQ.css"

const FAQ = () => {
  const faqs = [
    { question: "What is Eco Thread Exchange?", answer: "Eco Thread Exchange is a platform for exchanging pre-loved clothing, promoting sustainable fashion and reducing textile waste." },
    { question: "How does Eco Thread Exchange benefit the environment?", answer: "It reduces landfill waste, encourages recycling, and promotes eco-friendly consumption practices." },
    { question: "Can anyone join Eco Thread Exchange?", answer: "Yes, anyone can create an account, list their pre-loved clothes, and participate in trades." },
    { question: "Is there a fee for using Eco Thread Exchange?", answer: "No, the platform is free to use. However, users are responsible for shipping costs when exchanging items." },
    { question: "How do I list an item for exchange?", answer: "You can log in, go to the 'Add Item' section, upload photos, provide a description, and list it for exchange." },
    { question: "What types of items can be exchanged?", answer: "You can exchange clothing, shoes, and accessories, as long as they are in good condition." },
    { question: "How do I ensure a safe exchange?", answer: "Always verify the other party's profile, communicate through the platform, and use secure shipping methods." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              {faq.question}
              <span className={`faq-arrow ${openIndex === index ? "open" : ""}`}>&#9660;</span>
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
