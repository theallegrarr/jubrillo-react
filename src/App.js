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
import Freelancers from '../src/components/Freelancers/Freelancers';
import Projects from '../src/components/Projects/Projects';
import NewProject from '../src/components/Projects/NewProject';
import ProjectPage from '../src/components/Projects/ProjectPage';
import ViewFreelancer from '../src/components/Freelancers/ViewFreelancer';
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
          exact path='/profile'
          render={props => {
              if (user) {
                return (<Profile {...props} userDetails={user} />)
              }
            return <Redirect to='/' />
          }} />

        {/* <Route 
          exact path='/myprojects'
          render={props => {
              if (user) {
                return (<Profile {...props} userDetails={user} />)
              }
            return <Redirect to='/' />
          }} /> */}

      <Route 
          exact path='/freelancers'
          render={props => {
              return (<Freelancers {...props}/>)
          }} />

      <Route 
          path='/freelancers/:username'
          render={props => {
              return (<ViewFreelancer {...props}/>)
          }} />
      
      <Route 
          exact path='/projects'
          render={props => {
              return (<Projects {...props}/>)
          }} />

      <Route 
          exact path='/projects/:project_index'
          render={props => {
              return (<ProjectPage {...props}/>)
          }} />

      <Route 
          exact path='/newproject'
          render={props => {
              return (<NewProject {...props}/>)
          }} />
      </div>
    </div>
  );
}

export default App;