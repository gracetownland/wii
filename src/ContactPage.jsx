import React, {useState} from 'react';
import emailjs from 'emailjs-com';
import './ContactPage.css'; // Create this CSS file for specific styling
import background from './img/ContactPage.jpg'

function ContactPage() {
  //need to use state variables to store values
const [name,setName] = useState('');
const [email, setEmail] = useState('');
const [message,setMessage]=useState('');

//Form submission
const handleSubmti= (e)=>{
  e.preventDefault();
const templateParams = { 
  from_name: name, 
  from_email: email,
   message: message,
   }; 
   emailjs.send('service_5ue8zyb', 'template_e1zdujn', templateParams, 'WlyfmaU-3df4UeAfb') .then((response) => { console.log('SUCCESS!', response.status, response.text); }, (err) => { console.error('FAILED...', err); }); }

return (
  <>
  <div id='ReachOut' className='backgroundImage' style={{backgroundImage: `url(${background})`}}>
  <div className='titleCard'>
GET IN TOUCH  
      </div>
      <form onSubmit={handleSubmti}>
        <div><label htmlFor="name">Name:</label> 
          <input type='text' id='name' value={name} onChange={(e)=> setName(e.target.value)} required>
          </input>
        </div>
        <div> <label htmlFor="email">Email:</label> <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> </div> <div> <label htmlFor="message">Message:</label> <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required /> </div> <button type="submit">Submit</button>
      </form>   
    </div>
  </>

  );
}

export default ContactPage;