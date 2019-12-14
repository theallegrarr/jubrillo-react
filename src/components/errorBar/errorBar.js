import React from 'react';
import { message } from 'antd';

export default function errorBar({ errorMessage, errorType, removeError }){
  const key = 'same';

  return(
  <>
    {
    errorType === 'good' ? 
      message.success({ content: errorMessage, key, duration: 4 })
      :
      message.warning({ content: errorMessage, key, duration: 4 })
    }
  </>);
}