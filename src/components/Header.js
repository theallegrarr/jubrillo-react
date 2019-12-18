import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/index.css';
import '../css/global.css';
import { 
  //FaSearch, 
  FaAlignJustify, FaIdCard, FaListAlt, FaSignOutAlt, FaBriefcase, FaRegMoneyBillAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';
import { User, configure } from 'radiks';
// import createUser from '../model/createUser';
import MessageSchema from '../model/Message';
import LastCheck from '../model/LastCheck';
const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })
const avatarFallbackImage = 'https://s3.amazonaws.com/onename/avatar-placeholder.png';

configure({
  apiServer: 'http://localhost:1260',
  //apiServer: 'https://jubrillo-node-alt.herokuapp.com',
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
      color: false,
      user: 'loading...',
      created: false,
      messageExists: false,
      isTop: true
  	};
  }
  
  componentDidMount() {
    const localData=JSON.parse(localStorage.getItem('blockstack-session'));
    const localuser=localData.userData;

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 100;
      if (isTop !== this.state.isTop) {
          this.setState({ 
            ...this.state,
            isTop
          })
      }
    });

    if(localuser && this.state.user === 'loading...'){
      this.setState({
        ...this.state,
        user: localuser.username
      })
    }
    const localUserData=JSON.parse(localStorage.getItem('blockstack-session'));
    const person=localUserData.userData;

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/")
        this.setState({ 
          ...this.state,
          userData: userData,
          user: person ? person.username : userSession.loadUserData().username
        })
      });
      
    }
    //console.log(this.state)
    
    if(userSession.isUserSignedIn()){
        if(checkCreated(this.state.created)){
          this.setState({
            ...this.state,
            created: true
          })
        }

        if(this.state.user === 'loading...'){
          this.setState({
          ...this.state,
          person: new Person(userSession.loadUserData().profile),
          username: userSession.loadUserData().username,
          user: person ? person.username : userSession.loadUserData().username,
          color: this.state.color
        });
      }
    }

    async function checkCreated (created){
      try {
        //await userSession.handlePendingSignIn();
        if(created === false){ 
          await User.createWithCurrentUser();
          return true;
        }
      } catch(error) {
        console.log(error)
      }
    }
    
    this.interval = setInterval( async () => {
      
      if(userSession.isUserSignedIn()){
        //console.log(1)
      MessageSchema.fetchList({
        to: this.state.user,
        sort: '-createdAt',
        limit: 50
      }).then(res => {
        if(res.length > 0){
          this.setState({
            ...this.state,
            messageExists: true
          })
        }
      }).catch(err => {})

      const localData=JSON.parse(localStorage.getItem('blockstack-session'));
      const person=localData.userData;
      //console.log(this.state.user)
      if(person && this.state.messageExists){
        checkNotifications(person.username)
          .then(res => {
            //console.log(res)
            if(res === true){
              this.setState({
                ...this.state,
                color: true
              });
            } else {
              this.setState({
                ...this.state,
                color: false
              });
            }
            //console.log(this.state)
          }).catch(error => { console.log(error) })
      }
    
    }
      
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  async handleSignIn(e) {
    //e.preventDefault();
    userSession.redirectToSignIn();
    
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render(){
    // const { person } = this.state;

    return(
      <div className='header-container'>
        <nav 
        className='navbar'
        style={{
          'backgroundColor': this.state.isTop ? 'none' : '#0E1C5D'
        }}>
          <NavLink key={'000'} to={'/'} className='navImg'>
            <img src={logo} alt='logo'></img>
          </NavLink>

          <div className='links'>
          {/* <div className='search'>
           <button className='searchButton'>
              <FaSearch />
            </button>
            <input className='searchTerm' type='text' placeholder='Search.....'>
            </input> 
          </div> */}
          
          {userSession.isUserSignedIn() &&
          <>
            <NavLink 
            className="link" 
            key={'001'} 
            to={'/freelancers'}>
              freelancers
            </NavLink>
            <NavLink className="link" key={'002'} to={'/projects'}>
              projects
            </NavLink>
            <NavLink className="link" key={'003'} to={'/forum'}>
              forum
            </NavLink>
          </>
          }
          <NavLink className="link" key={'004'} to={'/faq'}>
            faq
          </NavLink>
          {/* <NavLink className="link" key={'005'} to={'/escrow'}>
            escrow
          </NavLink> */}
          {
            !userSession.isUserSignedIn() ?
              <button 
              className='signbutton'
              onClick={ this.handleSignIn.bind(this) }
              > Log In/Regsiter </button> 
              : 
              (
              <>
              <div className="dropdown">
                <div 
                className="dropbtn"
                style={this.state.color ?
                  {backgroundColor: 'green'}
                  :
                  {backgroundColor: '#2646de'}
                }>
                  <FaAlignJustify />
                  {this.state.user}
                </div>
                <div className="dropdown-content">
                  
                  <NavLink 
                    to={"/profile"} 
                    className='drop-link'
                    key={'0042'}><FaIdCard />My Profile
                  </NavLink>

                  <NavLink 
                    to={"/notifications"} 
                    className='drop-link'
                    key={'0043'}
                    style={this.state.color ?
                      {backgroundColor: 'green'}
                      :
                      {backgroundColor: 'darkgray'}}
                  >
                    <FaIdCard />Notifications
                  </NavLink>

                  <NavLink 
                  to={"/myprojects"} 
                  className='drop-link'
                  key={'0044'}><FaBriefcase />My Projects
                  </NavLink>

                  <NavLink 
                  to={"/messages"} 
                  className='drop-link'
                  key={'0045'}><FaListAlt />Messages
                  </NavLink>
                  <NavLink 
                  to={"/transactions"} 
                  className='drop-link'
                  key={'0046'}><FaRegMoneyBillAlt />Transactions
                  </NavLink>
                  
                  
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
        <a 
        style={{display: "table-cell"}} 
        href="https://discord.gg/5Kx8MFs" 
        target="_blank"
        rel="noopener noreferrer"
        className="error-alert">
            {/* <img 
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHIIV-ZJOTXj5zVl9Dphh-Mf4s58HebQyybuxy9bqpqQGmlqqx&s`}
            alt='support' /> */}
            <p>Need Help</p>
            ?
        </a>
      </div>
    );}
}

async function checkNotifications(username) {
  try {
    const allThreadMessages = await MessageSchema.fetchList({
      to: username,
      sort: '-createdAt',
      limit: 50
    })
    
    const checked = await LastCheck.fetchList({
      owner: username
    })
    if(checked.length === 0){
      const newCheck = new LastCheck({
        message: 'checked',
        owner: username
      })
      await newCheck.save()
    }
    
    //console.log(checked);
    if(checked.length>0){
      if(allThreadMessages.length > 0 && checked && (checked[0].attrs.updatedAt)) {
        if(checkTime(allThreadMessages, checked[0].attrs.updatedAt)){
          //console.log('time checked')
          return true;
        } 
      }
    }

  } catch (error) {
    console.log(error);
  }
}

function checkTime(messages, lastUpdateTime) {
  for(let i=messages.length-1; i>=0; i--){
    //console.log(lastUpdateTime, messages[i].attrs.createdAt)
    if(messages[i].attrs.createdAt > lastUpdateTime){
      //console.log(lastUpdateTime, messages[i].attrs.createdAt)
      return true;
    }
  }
  return false;
}