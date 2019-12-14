import React from 'react';
import { message } from 'antd';

export default function errorBar({ errorMessage, errorType, removeError }){
  const key = 'same';

  return(
  <div
    onClick={() => removeError('')}
    style={{'cursor': 'pointer'}}
  >
    {
      errorType === 'loading' &&
        message.loading({ content: errorMessage, key, duration: 4 })
    }
    {
      errorType === 'good' &&
        message.success({ content: errorMessage, key, duration: 4 })
    }
    {
      errorType === 'bad' &&
        message.error({ content: errorMessage, key, duration: 4 })
    }
  </div>);
}