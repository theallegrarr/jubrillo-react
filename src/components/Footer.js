import React from 'react';
//import { FaTwitter } from 'react-icons/fa';

export default function Footer (props) {

  return(
  <div className='footer'>
		<footer className="footer-distributed">

			<div className="footer-left">

				<h3>Jubrillo &copy; 2019</h3>

				<p className="footer-links">
					{/*<a href="/forum">Forum</a>
           {' '}·{' '} */}
					<a href="/faq">FAQ</a>
          {/* .
          <p>Jubrillo &copy; 2019</p> */}
          {/* <div class="footer-icons">
          <a href="#"><FaTwitter /></a>
          </div> */}
				</p>

				
			</div>

			<div className="footer-center">

				<div>
					<i className="fa fa-phone"></i>
					<p>Contact us:</p>
				</div>

				<div>
					<i className="fa fa-envelope"></i>
					<p><a href="mailto:support@jubrillo.work">support@jubrillo.work</a>
          </p>
            
        </div>
      </div>
      
			<div className="footer-right">

				<p className="footer-company-about">
					<span>About this service</span>
				 {`A Freelance work & hiring service that respects the core principles of decentralization`}
				</p>
        
			</div>
      
		</footer>
  </div>)
}