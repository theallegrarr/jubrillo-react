import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaCommentAlt, FaUserEdit, FaBriefcase } from 'react-icons/fa';
import { Multiselect } from 'react-widgets';
import * as data from './skillsData.json';

// Summary, ratings, skills, rate, Role, Image, Name, Location
let person={};
// const skillsData = [
//   "JavaScript",
//   "C++",
//   "C#",
//   "Python",
//   "Ruby",
//   "PHP",
//   "OpenCart",
//   "Magento",
//   "Wordpress",
//   "Software Development",
//   "Creative Writing",
//   "Game Development",
//   "Web Development",
//   "Data Analyst",
//   "Quantitative Analyst",
//   "React.js",
//   "Node.js",
//   "Java",
//   "Vue.js","Angular.js","Django","MQL4","MQL5","cAlgo",
// ];

export default function Profile(props) {

  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  person=localData.userData.profile;
  
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
  const multiSelect = useRef();
  const [picked, setPicks] = useState({});
  let preselectValues  = ['Ruby'];

  return (
    <Formik 
      initialValues={{ email: '', summary: '' }}
      //onSubmit={}
      render={() => (
        <Form className='edit-profile'>
          <Field className='profile-input' name='email' type="text" placeholder='Enter your email....' />
          <div className='control-pane'>
          <div className='control-section'>
              <div id='multidefault' className="control-styles">
                <MultiSelectComponent 
                id="customelement" 
                dataSource={data.skills} 
                fields={fields} mode="Box"
                value={preselectValues}
                placeholder="Your Skills" 
                change={(e) => console.log(e.value)}
                />
              </div>
          </div>
          
        </div>

          {/* <div className='multiselect'>
            <Multiselect
              data={skillsData}
              defaultValue={''}
              textField='name'
              caseSensitive={false}
              minLength={3}
              filter='contains'
              onChange={(e) => setPicks(e)}
            />
          </div> */}
          <div>
            <ClassicEditorFunction />
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

function ClassicEditorFunction(){

  return(
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data="<p>Tell Us About You!</p>"
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              console.log( { event, editor, data } );
          } }
          onBlur={ ( event, editor ) => {
              console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              console.log( 'Focus.', editor );
          } }
      />
  </div>
  );
}