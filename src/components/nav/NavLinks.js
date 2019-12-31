import React from 'react';
import { NavLink } from 'react-router-dom';
import uuid from 'uuid';
import { 
  //FaSearch, 
  FaAlignJustify, 
  FaUser, FaIdCard, 
  FaListAlt, FaSignOutAlt, 
  FaBriefcase, FaRegMoneyBillAlt,
  FaExclamationCircle } from 'react-icons/fa';

export default function NavLinks({ userSession, color, user, handleSignIn, handleSignOut }){

  return (
    <>
      <div className="dropdown2">
        {
          !userSession.isUserSignedIn() ?
            <button 
            className='signbutton'
            onClick={ handleSignIn.bind(this) }
            > Start </button> 
            : 
            (
            <>
            
              <div 
              className="dropbtn2"
              onClick={() => setDisplay('dropdown-content2','dropbtn2','dropdown-content3','dropbtn3')}
              style={color ?
                {backgroundColor: 'green'}
                :
                {backgroundColor: '#2646de'}
              }>
                <FaUser />
              </div>
              <div className="dropdown-content2">
                
                <NavLink 
                  to={"/profile"} 
                  className='drop-link'
                  key={uuid}><FaIdCard />My Profile
                </NavLink>

                <NavLink 
                  to={"/notifications"} 
                  className='drop-link'
                  key={uuid}
                  style={color ?
                    {backgroundColor: '#DE536B'}
                    :
                    {backgroundColor: '#2646de'}}
                >
                  <FaExclamationCircle />Notifications
                </NavLink>

                <NavLink 
                to={"/myprojects"} 
                className='drop-link'
                key={uuid}><FaBriefcase />My Projects
                </NavLink>

                <NavLink 
                to={"/messages"} 
                className='drop-link'
                key={uuid}><FaListAlt />Messages
                </NavLink>
                <NavLink 
                to={"/transactions"} 
                className='drop-link'
                key={uuid}><FaRegMoneyBillAlt />Transactions
                </NavLink>
                
                
                <a href="/"
                onClick={ handleSignOut.bind(this) }
                className='drop-link'><FaSignOutAlt />Sign Out</a>
              </div>
            </>
        )}
        </div>
        <div className='dropdown3'>
          <div 
            className="dropbtn3"
            onClick={() => setDisplay('dropdown-content3','dropbtn3','dropdown-content2','dropbtn2')}
            style={color ?
                {backgroundColor: 'green'}
                :
                {backgroundColor: '#2646de'}
              }>
                <FaAlignJustify />
              </div>
          <div className='dropdown-content3'>
          {userSession.isUserSignedIn() &&
            <>
              <NavLink 
              className="drop-link" 
              key={uuid} 
              to={'/freelancers'}>
                freelancers
              </NavLink>
              <NavLink className="drop-link" key={uuid} to={'/projects'}>
                projects
              </NavLink>
              <NavLink className="drop-link" key={uuid} to={'/forum'}>
                forum
              </NavLink>
            </>
            }
            <NavLink className="drop-link" key={uuid} to={'/faq'}>
              faq
            </NavLink>
          </div>
        </div>
    </>
  );
}

function setDisplay(classname, classname2, className3, className4) {
  const x = document.getElementsByClassName(classname)[0];
  const y = document.getElementsByClassName(classname2)[0];
  const a = document.getElementsByClassName(className3)[0];
  const b = document.getElementsByClassName(className4)[0];

  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.backgroundColor = "#DE536B";
    a.style.display = "none";
    b.style.backgroundColor = "rgb(38, 70, 222)";
  } else {
    x.style.display = "none";
    y.style.backgroundColor = "rgb(38, 70, 222)";
  }
}