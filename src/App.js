import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';
import Header from '../src/components/Header';
import Cta from '../src/components/Cta';
import Profile from '../src/components/User/Profile';
import './App.css';
import '../src/css/index.css';
import '../src/css/global.css';

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })

function App() {
  const [ user, setUser ] = useState({});
  
  useEffect(() => {
    if(userSession.isUserSignedIn()){
      setUser({
        person: new Person(userSession.loadUserData().profile),
        username: userSession.loadUserData().username,
      })
    }
    
  }, [])

  

  return (
    <div>
      <div className='main container'>
        <Header className='navbar' />
        <Route exact path='/' component={Cta} />
        
        <Route 
          path='/profile'
          render={props => {
              if (user) {
                return (<Profile {...props} userDetails={user} />)
              }
            return <Redirect to='/' />
          }} />
      </div>
    </div>
  );
}

export default App;