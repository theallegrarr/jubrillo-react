import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaCommentAlt, FaUserEdit, FaBriefcase } from 'react-icons/fa';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as data from './skillsData.json';
// Summary, ratings, skills, rate, Role, Image, Name, Location
let person={};
let rteObject={};

export default function Profile(props) {
  const onLogin = ({ username, password }) => {
    return props.onLogin({ username, password });
  };
  //if(props.userDetails.person)console.log(props.userDetails.person);
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  console.log(localData)
  person=localData.userData.profile;
  
  console.log(props)
  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const StyledRating = withStyles({
    iconFilled: {
      display: 'flex',
      color: '#FF3366',
      fontSize: '25pt',
      alignSelf: 'center',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

  const [editing, setEdit] = useState(true);

  return (
    <div className='profile-form'>
    {!person.image["0"].contentUrl && (<CircularProgress className={classes.progress} />)}
    {person && (
    <>
    <div className='profile-info'>
      <img src={person.image["0"].contentUrl} alt='profile'/>
        <div className='profile-others'>
          <h2 className='name'>{person.name}</h2>
          <h3 className='username'>{props.userDetails.username}</h3>
          <div className='ratings' ><p>Ratings:   <br/><StyledRating
            name="customized-color"
            value={5}
            // getLabelText={getLabelText}
            precision={0.5}
            icon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          /></p></div>
          
        </div>
        <div className='buttons'>
          <button className='edit-button' onClick={() => setEdit(true)}>
            <FaUserEdit/>
            EDIT
          </button>
          <button className='hire-button'>
          <FaBriefcase />
          HIRE
          </button>
          <button className='msg-button'>
          <FaCommentAlt />
          MESSAGE
          </button>
        </div>
    </div>
    {/*  */}

    </>)}
      <div className='profile-details'>
        <div className='skills'>
          
        </div>
        <div className='summary'>

        </div>
        <div className='projects'>

        </div>
      </div>
      {editing && ProfileForm()}
    </div>
  );
}

const fields = { text: 'Name', value: 'Code' };
function ProfileForm(){

  return (
    <Formik 
      initialValues={{ email: '', summary: '' }}
      //onSubmit={}
      render={() => (
        <Form className='edit-profile'>
          <Field className='profile-input' name='email' type="text" placeholder='Enter your email....' />
          <MultiSelectComponent className="control-styles" id="defaultelement" dataSource={data['skills']} mode="Default" fields={fields} placeholder="Your Skills"/>
          <div className='control-pane'>
            <div className='control-section' id="rte">
              <div className='rte-control-section'>
                <RichTextEditorComponent id="defaultRTE" ref={(richtexteditor) => { rteObject = richtexteditor; }}>
                  
                  <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]}/>
                </RichTextEditorComponent>
              </div>
            </div>
          </div>

          <div className='buttons'>
            <button className='submit'>SAVE</button>
            <button className='cancel'>CANCEL</button>
          </div>
        </Form>
      )}
    />
  );
}