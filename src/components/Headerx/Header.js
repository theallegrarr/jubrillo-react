import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function NavBar({ userSession, color, user, handleSignIn, handleSignOut }){

  return (
    <>
    <div className='nav-container'>
      <nav className='nav-new'>
        <div className='hamburger'>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>

        <ul className='nav-links'>
          <li><NavLink to="/freelancers" className='a'>Freelancers</NavLink></li>
          <li><NavLink to="/projects" className='a'>Projects</NavLink></li>
          <li><NavLink to="/forum" className='a'>Forum</NavLink></li>
          <li><NavLink to="/faq" className='a'>Faq</NavLink></li>
        </ul>
      </nav>

    </div>
    </>
  );
}