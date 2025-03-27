import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css'; // Create this CSS file for specific styling
import background from './img/sunset.JPG';

function ContactPage() {
  // State variables to store form values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };
    emailjs
      .send('service_5ue8zyb', 'template_e1zdujn', templateParams, 'WlyfmaU-3df4UeAfb')
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert("Message Sent Successfully! 🚀"); // Placeholder action
        },
        (err) => {
          console.error('FAILED...', err);
        }
      );
  };

  // Auto-resize textarea
  useEffect(() => {
    const textareas = document.querySelectorAll('.formTextarea');

    textareas.forEach(textarea => {
      textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
      });
    });

    return () => {
      textareas.forEach(textarea => {
        textarea.removeEventListener('input', function() {
          this.style.height = 'auto';
          this.style.height = (this.scrollHeight) + 'px';
        });
      });
    };
  }, []);

  return (
    <div
      id="ReachOut"
      className="backgroundImage"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="titleCard">GET IN TOUCH <a href='https://www.instagram.com/siyadwi/'>☀️</a></div>
      <form onSubmit={handleSubmit} className="contactForm">
        <div className="formRow">
          <label htmlFor="name" className="formLabel">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="formInput"
            required
          />
        </div>
        <div className="formRow">
          <label htmlFor="email" className="formLabel">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="formInput"
            required
          />
        </div>
        <div className="formRow">
          <label htmlFor="message" className="formLabel">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="formTextarea"
            required
          />
        </div>
        <button type="submit" className="submitButton">Submit</button>
      </form>
    </div>
  );
}

export default ContactPage;