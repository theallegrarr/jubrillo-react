import React from 'react';
import { Formik, Form, Field } from 'formik';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { Form as AntForm, Icon, Input, Button, Checkbox } from 'antd';

// Summary, skills, rate, Role, Image, Name, Location

export default function Profile(props) {
  const onLogin = ({ username, password }) => {
    return props.onLogin({ username, password });
  };
  console.log(props.userDetails);
  return (
    <div className='profile-form'>
    <Formik
      
      initialValues={{ username: '', password: '' }}
      onSubmit={onLogin}
      render={() => (
        <Form className='login'>
          <Field name='username' type="text" placeholder='username' />
          <Field name='password' type="text" placeholder='password' />
          <input type='submit' />
        </Form>
      )}
    /></div>
  );
}