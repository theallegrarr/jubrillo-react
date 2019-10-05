import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/index.css';
import '../css/global.css';
import { FaSearch } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Header = props => (
  <div>
    <nav className='navbar'>
      <NavLink key={'000'} to={'/'} className='navImg'>
        <img src={logo} alt='logo'></img>
      </NavLink>

      <div className='links'>
      <div className='search'>
        <button className='searchButton'>
          <FaSearch />
        </button>
        <input className='searchTerm' type='text' placeholder='Search.....'>
        </input>
      </div>
      <NavLink className="link" key={'001'} to={'/freelancers'}>
        freelancers
      </NavLink>
      <NavLink className="link" key={'002'} to={'/projects'}>
        projects
      </NavLink>
      <NavLink className="link" key={'003'} to={'/collaborate'}>
        collaborate
      </NavLink>
      <NavLink className="link" key={'004'} to={'/board'}>
        board
      </NavLink>
      <NavLink className="link" key={'005'} to={'/escrow'}>
        escrow
      </NavLink>
      <button className='signbutton'>
        Get Started
      </button>
      </div>
    </nav>
  </div>
);

export default Header;
