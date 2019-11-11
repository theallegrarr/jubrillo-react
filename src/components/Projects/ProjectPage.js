import React, { useState, useEffect } from 'react';
import { FaCommentAlt, FaBriefcase } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import Projects from '../../model/Project';
import Profile from '../../model/Profile';
import * as data from '../User/skillsData.json';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
const fields = { text: 'Name', value: 'Code' };

export default function ProjectPage(props) {
  const [project, setProject] = useState({});
  const [employer, setEmployer] = useState({});
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    Projects.fetchList({
      "project_index": props.match.params.project_index
    }).then(res => {
      if(res.length>0){

        const project={
          title: res[0].attrs.title,
          description: res[0].attrs.description,
          employer_rating: res[0].attrs.employer_rating,
          step: res[0].attrs.step,
          active: res[0].attrs.active,
          skills: res[0].attrs.skills,
          username: res[0].attrs.employer_username,
          project: res[0].attrs.budget
        }

        setProject(project);
        Profile.fetchList({ username: res[0].attrs.employer_username })
          .then(user => {
            setEmployer(user[0].attrs)
          }).catch(err => {
            console.log(err);
          })

      }
    })
  }, [])

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '50%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  function createMarkup() {
    return {__html: project.description};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  const StyledRating2 = withStyles({
    iconFilled: {
      display: 'flex',
      color: '#FF3366',
      fontSize: '15pt',
      alignSelf: 'center',
      marginTop: '0',
      paddingTop: '0',
      justifySelf: 'center'
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

  return(
    <div className='project-container'>
    
      {
        project ? 
          <>
            <div className='project-view-page'>
              <h2><span 
                role='img'
                description='lightning'
      aria-labelledby=''>💼{' '}</span>
                {project.title}</h2>
            
              <div className='control-pane'>
                <div className='control-section'>
                    <div id='multidefault' className="control-styles">
                      <MultiSelectComponent 
                      id="customelement" 
                      dataSource={data.skills} 
                      fields={fields} mode="Box"
                      value={project.skills}
                      placeholder="Required Skills" 
                      readonly={true}
                      />
                    </div>
                </div>
              </div>

              <p><MyComponent /></p>
            </div>
            <div className='employer-info'>
          <p>Employer: {employer.username}</p>
          <div className='rating-emp'>
            <p>Rating:</p>
            <StyledRating2 
              value={employer.rating} 
              readOnly 
              />
          </div>
          <p>Jobs Done: {employer.jobsDone}</p>
          <p>Jobs Created: {employer.jobsCreated}</p>
          <p>Employer Account was Created: {timeAgo.format(Date.now() - (Date.now()-employer.createdAt))}</p>
          <ApplicationForm 
            budget={budget}
            setBudget={setBudget}
            duration={duration}
            setDuration={setDuration}
            message={message}
            setMessage={setMessage}
          />
          </div>
          </>
        :
        <CircularProgress className={classes.progress} />
      }
    
    
    </div>
  );
}

function ApplicationForm({ 
  budget, setBudget, 
  duration, setDuration, 
  message, setMessage 
}) {

  return(
    <div className='apply'>
      <p>Budget($): </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Enter Your Budget!'
        value={budget}
        onChange={(e) => {
          setBudget(e.target.value);
        }}
        ></input>
      <p>Duration(in days): </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='How long do you need!'
        value={duration}
        onChange={(e) => {
          setDuration(e.target.value);
        }}
        ></input>
      <p>Message to Employer: </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Write a Message!'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        ></input>
        <button className='sort-apply'>
          <span 
          role='img'
          description='lightning'
          aria-labelledby=''>⚡</span>
           Make Offer!
        </button>
    </div>
  );
}