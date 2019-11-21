import React from 'react';
import ctaImage from '../assets/cta-image4.png';
import '../css/index.css';
import '../css/global.css';

const Header = props => (
  <div className='cta-container'>
    <div className='cta-text'>
      <h1>
      The future of online work is decentralized
      </h1>
      <p>
      Join the blockchain phase of freelancing, 
      jubrillo is designed to guarantee a fast, fair, secure, 
      and affordable means of transacting for employers and 
      freelancers. 
      <br></br>
      <br></br>Leveraging some unique features of decentralization,
      we have created a system that allows anyone to create or perform tasks
      while preventing any form of intrusion and giving everyone full control of
      their data
      <br></br>
      <br></br> To get started, click the button below and set up your blockstack
      account if you do not already have one, but if you do, just sign in with 
      blockstack
      </p>
      <div className='cta-buttons'>
        <button className='faq-button'>FAQ</button>
        <button className='gs-button'>Get Started</button>
      </div>
    </div>

    <img src={ctaImage} alt='cta'></img>
  </div>
);

export default Header;
