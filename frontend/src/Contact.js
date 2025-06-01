import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact-content">
      <h2>Contact Us</h2>
      <p>Email: yds110224@gmail.com</p>
      <p>Phone: Top Secret</p>
      <img
        src={process.env.PUBLIC_URL + '/cat.png'}
        alt="cat"
        className="cat-image-fixed"
      />
    </div>
  );
}

export default Contact;