import React from 'react';

export default function errorBar({ errorMessage, errorType, removeError }){

  return(
  <>
    <div 
      className="error-alert"
      style={errorType==='good' ? 
      {backgroundColor: 'green'}
      :
      {backgroundColor: 'red'}
    }>
      <span 
      className="close-alert" 
      onClick={() => removeError('')}>&times;</span>
        {errorType === 'good' ?
'✔️' : '❌' }{' '}{errorMessage}
    </div>
  </>);
}