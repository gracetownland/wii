import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css'; // Create this CSS file for specific styling
import background from './img/ContactPage.jpg';

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
        },
        (err) => {
          console.error('FAILED...', err);
        }
      );
  };

  return (
    <>
      <div
        id="ReachOut"
        className="backgroundImage"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="titleCard">GET IN TOUCH</div>
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
    </>
  );
}

export default ContactPage;