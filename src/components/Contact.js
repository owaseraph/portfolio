import React from 'react';
import { useForm, ValidationError } from '@formspree/react'; 
import '../App.css';

const Contact = () => {
  
  const [state, handleSubmit] = useForm("xzzwlwoz");

  if (state.succeeded) {
    return (
      <section id="contact" className="contact-section">
         <h2 className="section-title">
            &gt; UPLINK_ESTABLISHED <span className="cursor-blink">_</span>
         </h2>
         <div className="contact-container" style={{textAlign: 'center', padding: '50px'}}>
            <div className="terminal-header-strip">
              <span className="status-light green"></span> STATUS: COMPLETE
            </div>
            <h3 style={{color: '#39ff14', fontFamily: 'Fira Code', marginTop: '20px'}}>
              &gt; TRANSMISSION_RECEIVED.
            </h3>
            <p style={{color: '#888', fontFamily: 'Inter', marginTop: '10px'}}>
              We will initiate a response protocol shortly.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-secondary" 
              style={{marginTop: '20px'}}
            >
              RESET_TERMINAL
            </button>
         </div>
      </section>
    );
  }

 
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">
        &gt; ESTABLISH_UPLINK <span className="cursor-blink">_</span>
      </h2>

      <div className="contact-container">
        <div className="terminal-header-strip">
          <span className="status-light green"></span> TRANSMISSION_MODE: ENCRYPTED
        </div>

        <p className="contact-prompt">
          INCOMING_CONNECTION: Ready to receive project inquiries or collaboration requests.
        </p>

        <form onSubmit={handleSubmit} className="terminal-form">
          
          <div className="form-group">
            <label htmlFor="name">&gt; SENDER_IDENTITY:</label>
            <input type="text" id="name" name="name" placeholder="Enter identification..." required />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>

          <div className="form-group">
            <label htmlFor="email">&gt; RETURN_ADDRESS (Email):</label>
            <input type="email" id="email" name="email" placeholder="Enter email..." required />
            <ValidationError prefix="Email" field="email" errors={state.errors} />
          </div>

          <div className="form-group">
            <label htmlFor="message">&gt; DATA_PACKET (Message):</label>
            <textarea id="message" name="message" rows="5" placeholder="Type message stream here..." required></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} />
          </div>

          <button type="submit" className="btn btn-primary submit-btn" disabled={state.submitting}>
            {state.submitting ? "[ TRANSMITTING... ]" : "[ TRANSMIT_DATA ]"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;