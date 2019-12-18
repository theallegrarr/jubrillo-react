import React from 'react';
import { 
  //FaSearch, 
  FaAsterisk, FaHandsHelping, FaConnectdevelop } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import SEO from 'react-seo-component';
import ctaImage from '../assets/cta-image4.png';
import ProductHunt from './ProductHunt';
import '../css/index.css';
import '../css/global.css';
import navimage from '../assets/logo.png';

const Header = props => (
  <>
  <SEO
    title={'Jubrillo'}
    description={'Work & Hire'}
    image={navimage}
    pathname={'www.jubrillo.work'}
    siteLanguage={'en'}
    siteLocale={'en_gb'}
    twitterUsername={'jubrillowork'}
  />
  <Helmet>
    <title>{`Jubrillo - Work & Hire`}</title>
  </Helmet>
  <div className='cta-container'>
    <div className='cta-text'>
      <div><p className='head-1'>
      The future of online work is 
      </p>
      <p className='head-2'>Decentralized</p></div>
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
  <div className='ph-box'>
      <p>Give us an upvote if you like our app</p>
      <ProductHunt />
    </div>
  <div className='features-div'>
    <div className='ftr-head'>
      <h3>Features</h3>
    </div>

    <div className='feature-cards'>
      <div className='feature-card'>
        <FaConnectdevelop style={{ 
          'color': '#FF3366',
          'height': '1.7em',
          'width': '1.7em'  
          }}/>
        <h4>Decentralized</h4>
        <p>
          Simply put, your private data belongs to you and will not be shared with any third party
        </p>
      </div>
      <div className='feature-card'>
        <FaHandsHelping style={{ 
          'height': '1.5em',
          'width': '1.5em',
          'color': '#FF3366' 
          }}/>
        <h4>Easy To Use</h4>
        <p>
          The Work Process is straight forward and we are here to guide you if you need help, 
          we're just 1 click away
        </p>
      </div>
      <div className='feature-card'>
        <FaAsterisk style={{
          'color': '#FF3366',
          'height': '1.5em',
          'width': '1.5em'  
          }}/>
        <h4>Zero Restrictions</h4>
        <p>
          By default, all accounts have all privileges, 
          there is no limit to how many jobs you can post,
          or how many applications you can make to multiple jobs
        </p>
      </div>
    </div>
  </div>
  </>
);

export default Header;
