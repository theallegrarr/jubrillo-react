import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../src/components/Header';
import Cta from '../src/components/Cta';
import './App.css';
import '../src/css/index.css';
import '../src/css/global.css';

function App() {
  return (
    <div className='main container'>
      <Header className='navbar' />
      <Route exact path='/' component={Cta} />
    </div>
  );
}

export default App;