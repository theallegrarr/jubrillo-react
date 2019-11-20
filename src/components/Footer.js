import React from 'react';
//import { FaTwitter } from 'react-icons/fa';

export default function Footer (props) {

  return(
  <div className='footer'>
		<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Jubrillo</h3>

				<p class="footer-links">
					<a href="/forum">Forum</a>
          {' '}·{' '}
					<a href="/faq">FAQ</a>
          {/* .
          <p>Jubrillo &copy; 2019</p> */}
          {/* <div class="footer-icons">
          <a href="#"><FaTwitter /></a>
          </div> */}
				</p>

				
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-phone"></i>
					<p>Contact us:</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@jubrillo.work">support@jubrillo.work</a>
          </p>
            
        </div>
      </div>
      
			<div class="footer-right">

				<p class="footer-company-about">
					<span>About this service</span>
				 {`A Freelance work & hiring service that respects the core principles of decentralization`}
				</p>
        
			</div>
      
		</footer>
  </div>)
}