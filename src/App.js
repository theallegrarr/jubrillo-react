import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import {
  UserSession,
  AppConfig,
  Person
} from 'blockstack';
//import Header from '../src/components/Header';
import Header from '../src/components/Header';
import Cta from '../src/components/Cta';
import Profile from '../src/components/User/Profile';
import Freelancers from '../src/components/Freelancers/Freelancers';
import Projects from '../src/components/Projects/Projects';
import NewProject from '../src/components/Projects/NewProject';
import ProjectPage from '../src/components/Projects/ProjectPage';
import ProjectThread from '../src/components/Projects/ProjectThread';
import ViewFreelancer from '../src/components/Freelancers/ViewFreelancer';
import Messages from '../src/components/Messaging/Messages';
import Forum from '../src/components/Forum/Forum';
import NewPost from '../src/components/Forum/NewPost';
import Notifications from '../src/components/Notifications/Notifications';
import PostPage from '../src/components/Forum/ViewPost';
import FAQ from '../src/components/FAQ/FAQ';
import MyProjects from '../src/components/User/MyProjects';
import Transactions from '../src/components/User/MyTransactions';
import Footer from '../src/components/Footer';
import Particles from 'react-particles-js';
import particles from './components/particles.js';
import './App.css';
import '../src/css/index.css';
import '../src/css/global.css';

const appConfig = new AppConfig(['store_write', 'publish_data'])
const userSession = new UserSession({ appConfig: appConfig })

axios.interceptors.response.use(
  function(response) {
    response.headers["cant-be-evil"] = "true";
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

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
        <div id="particles-js"><Particles 
        params={particles} 
        className='particle-box'
        /></div>
        
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
          exact path='/projects/:project_index/thread'
          render={props => {
              return (<ProjectThread {...props}/>)
          }} />

      <Route 
          exact path='/newproject'
          render={props => {
              return (<NewProject {...props}/>)
          }} />

      <Route 
          exact path='/messages'
          render={props => {
              return (<Messages {...props}/>)
          }} />
      
      <Route 
          exact path='/messages/:other_person'
          render={props => {
              return (<Messages {...props}/>)
          }} />

      <Route 
          exact path='/notifications'
          render={props => {
              return (<Notifications {...props}/>)
          }} />
      
      <Route 
          exact path='/forum'
          render={props => {
              return (<Forum {...props}/>)
          }} />

      <Route 
          exact path='/forum/new'
          render={props => {
              return (<NewPost {...props}/>)
          }} />
      <Route 
          exact path='/forum/:post_index/view'
          render={props => {
              return (<PostPage {...props}/>)
          }} />
      <Route 
          exact path='/faq'
          render={props => {
              return (<FAQ {...props}/>)
          }} />
      <Route 
          exact path='/myprojects'
          render={props => {
              return (<MyProjects {...props}/>)
          }} />
      <Route 
          exact path='/transactions'
          render={props => {
              return (<Transactions {...props}/>)
          }} />
      </div>
      <Footer />
    </div>
  );
}

export default App;