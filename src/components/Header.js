import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/index.css';
import '../css/global.css';
import { FaSearch, FaAlignJustify, FaIdCard, FaListAlt, FaSignOutAlt, FaBriefcase, FaRegMoneyBillAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';
import { User, configure } from 'radiks';
import createUser from '../model/createUser';

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

configure({
  apiServer: 'http://localhost:1260',
  userSession,
});

export default class Header extends React.Component {
  constructor(props) {
  	super(props);

  	this.state = {
  	  person: {
  	  	name() {
          return 'Welcome';
        },
  	  	avatarUrl() {
  	  	  return avatarFallbackImage;
  	  	},
  	  },
  	};
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ userData: userData})
        //this.props.updateUser({ userData: userData});

        User.createWithCurrentUser().then(res => {
          // console.log(res)
          createUser(res);
        })
        .catch(err => console.log(err))
        
      });
      
    }
    //console.log(this.state)
    if(userSession.isUserSignedIn()){
      this.setState({
        person: new Person(userSession.loadUserData().profile),
        username: userSession.loadUserData().username,
      });
      User.createWithCurrentUser().then(res => {
        // console.log(res)
        createUser(res);
      })
      .catch(err => console.log(err))
      
    }
  }


  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render(){
    // const { person } = this.state;

    return(
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
          {
            !userSession.isUserSignedIn() ?
              <button 
              className='signbutton'
              onClick={ this.handleSignIn.bind(this) }
              > GET STARTED </button> 
              : 
              (
              <>
              <div className="dropdown">
                <button className="dropbtn"><FaAlignJustify />{this.state.username}</button>
                <div className="dropdown-content">
                  <a href="/profile" className='drop-link'><FaIdCard />Profile</a>
                  <a href="/myprojects" className='drop-link'><FaBriefcase />Projects</a>
                  <a href="/messages" className='drop-link'><FaListAlt />Messages</a>
                  <a href="/transactions" className='drop-link'><FaRegMoneyBillAlt />Transactions</a>
                  <a href="/"
                  onClick={ this.handleSignOut.bind(this) }
                  className='drop-link'><FaSignOutAlt />Sign Out</a>
                </div>
              </div>
              
              </>
              )              
          }

          </div>
        </nav>
      </div>
    );}
}