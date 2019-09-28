import React from 'react';
import Header from '../src/components/Header';
import Cta from '../src/components/Cta';
import './App.css';
import '../src/css/index.css';
import '../src/css/global.css';

function App() {
  return (
    <div className='main container'>
      <Header className='navbar' />
      <Cta />
    </div>
  );
}

export default App;