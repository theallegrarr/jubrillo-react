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
      Join the blockchain phase of freelancing online, jubrillo is designed to guarantee a fast, secure, and affordable means of transacting for employers and freelancers.
      </p>
      <div className='cta-buttons'>
        <button className='faq-button'>FAQ</button>
        <button className='gs-button'>START</button>
      </div>
    </div>

    <img src={ctaImage} alt='cta'></img>
  </div>
);

export default Header;
