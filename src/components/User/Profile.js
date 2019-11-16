import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaUserEdit } from 'react-icons/fa';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import { Multiselect } from 'react-widgets';
import updateProfile from '../../model/updateProfile';
import Profile from '../../model/Profile';
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

export default function UserProfile(props) {
  const [summary, setSummary] = useState();
  const [skills, setSkills] = useState([]);
  const [freelancer, setFreelancer] = useState(false);
  const [email, setEmail] = useState('');

  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  person=localData.userData.profile;
  //console.log(localData.userData.username);
  
  useEffect(() => {
    Profile.fetchList({
      "username": localData.userData.username
    }).then(res => {
      console.log(res)
      //res[0].destroy()
      if(res.length>0){
        setSummary(res[0].attrs.summary);
        setSkills(res[0].attrs.skills);
        setFreelancer(res[0].attrs.isFreelancer);
        setEmail(res[0].attrs.email);
      }
    })
  }, [])

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));

  const imageAddress = person.image ? person.image["0"].contentUrl : '';
  
  const uploadProfile = (e) => {
    e.preventDefault();
    const info = {
      name: person.name,
      summary: summary,
      skills: skills,
      isFreelancer: freelancer,
      username: localData.userData.username,
      email: email,
      image: imageAddress
    }
    updateProfile(info);
  }

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

  const [editing, setEdit] = useState(false);

  return (
    <div className='profile-form'>
    {!person && (<CircularProgress className={classes.progress} />)}
    {person && (
    <>
    <div className='profile-info'>
      { person.image ? 
        <img src={person.image["0"].contentUrl} alt='profile'/> : 
        <img src={`https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`} alt='profile'/>
      }
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
            <FaUserEdit/>{' '}
            EDIT
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
      {editing && ProfileForm(email, setEmail, setSummary, skills, setSkills, freelancer, setFreelancer, uploadProfile, setEdit, summary)}
      {!editing && ProfileDetails(email, freelancer, skills, summary)}
    </div>
  );
}

const fields = { text: 'Name', value: 'Code' };
function ProfileForm(email, setEmail, setSummary, skills, setSkills, freelancer, setFreelancer, uploadForm, setEdit, summary){
  //const [picked, setPicks] = useState({});
  
  return (
    <Formik 
      initialValues={{ email: '', summary: '' }}
      //onSubmit={}
      render={() => (
        <Form className='edit-profile'>
          <Field 
          className='profile-input' 
          name='email' 
          type="text" 
          placeholder='Enter your email....' 
          value={email}
          onChange={(e) => setEmail(e.target.value)}/>
          <div className='control-pane'>
          <div className='control-section'>
              <div id='multidefault' className="control-styles">
                <MultiSelectComponent 
                id="customelement" 
                dataSource={data.skills} 
                fields={fields} mode="Box"
                value={skills}
                placeholder="Your Skills" 
                change={(e) => setSkills(e.value)}
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
          <FormControl component="fieldset" className='switch-button'>
          <FormGroup>
            <FormControlLabel
              control={
              <Switch 
                checked={freelancer} 
                onChange={() => setFreelancer(!freelancer)} 
                value="start" 
              />}
              label="Are You a Freelancer"
            />
            </FormGroup>
          </FormControl>
          <div>
            <ClassicEditorFunction setValue={setSummary} summary={summary} />
          </div>
          <div className='buttons'>
            <button className='submit' onClick={uploadForm}>SAVE</button>
            <button className='cancel' onClick={() => {
              setEdit(false)
            }}>DONE</button>
          </div>
        </Form>
      )}
    />
  );
}

function ClassicEditorFunction(props){

  return(
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data={props.summary}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              //console.log( { event, editor, data } );
              props.setValue(data);
          } }
          onBlur={ ( event, editor ) => {
              //console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              //console.log( 'Focus.', editor );
          } }
      />
  </div>
  );
}

function ProfileDetails(email, freelancer, skills, summary){
  function createMarkup() {
    return {__html: summary};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  
  return(
    <div className="profile-show">
      <div className="profile-row">
        <h3>Email: </h3> 
          <h2>{email}</h2>
        </div>
      <div className="profile-row">
        <h3>Skills: </h3> 
      <h2>
      <div className='control-pane'>
        <div className='control-section'>
            <div id='multidefault' className="control-styles">
              <MultiSelectComponent 
              id="customelement" 
              dataSource={data.skills} 
              fields={fields} mode="Box"
              value={skills}
              placeholder="Your Skills" 
              readonly={true}
              />
            </div>
        </div>
      </div>
      </h2>

      </div>
      <div className="profile-row">
        <h3>Summary: </h3> 
        <div className='summary-view'>
          <MyComponent/>
        </div>
        </div>
    </div>
  );
}