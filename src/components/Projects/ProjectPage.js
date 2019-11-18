import React, { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
// import { FaCommentAlt, FaBriefcase } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
// import StarBorderIcon from '@material-ui/icons/Star'; 
import Projects from '../../model/Project';
import Profile from '../../model/Profile';
import Application from '../../model/addApplication';
import ApplicationSchema from '../../model/Applications';
import * as data from '../User/skillsData.json';
import ErrorBar from '../errorBar/errorBar';

const fields = { text: 'Name', value: 'Code' };

export default function ProjectPage(props) {
  const [project, setProject] = useState({});
  const [employer, setEmployer] = useState({});
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [message, setMessage] = useState('');
  const [applications, setApplications] = useState([]);
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState(''); 
  const person=localData.userData;
  
  const submitApplication = () => {
    const data = {
      project_id: project.project_id,
      project_index: props.match.params.project_index,
      applicant_username: person.username,
      applicant_bid: budget,
      applicant_message: message,
      duration: duration
    }
    // console.log(data)
    Application(data).then(res => {
      //console.log('promise: ',res)
    }).catch(err => console.log(err))
  }

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
          project: res[0].attrs.budget,
          project_id: res[0].attrs._id,
          selected_freelancer: res[0].attrs.selected_freelancer
        }
        // console.log(project)
        setProject(project);
        Profile.fetchList({ username: res[0].attrs.employer_username })
          .then(user => {
            setEmployer(user[0].attrs)  
          }).catch(err => {
            console.log(err);
          })
        
        ApplicationSchema.fetchList({"project_id": project.project_id})
        .then(apps => {
          //console.log(project.project_id, parseInt(props.match.params.project_index),apps)
          setApplications(apps);
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log(err))
  }, [])

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '15%',
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
    <div>
    <div className='project-container'>
    {errorMessage && 
      <ErrorBar 
      errorMessage={errorMessage}
      errorType={errorType}
      removeError={removeError}
      />}
      {
        project.title ? 
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

              <div className='p-text'><MyComponent /></div>
              <div className='applications'>
                {person.username === project.username &&
                  <>
                  <h2 className='applicant-heading'><span 
                    role='img'
                    description='lightning'
                    aria-labelledby=''
                    >📑{' '}</span>Applications({applications.length})</h2>
                  <ApplicantsList 
                  applications={applications} 
                  otherProps={props}
                  project={project}                
                  removeError={removeError}
                  setErrorType={setErrorType}/>
                  </>}
                </div>
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
          {(person.username !== project.username &&
           project.selected_freelancer !== person.username) && 
          <ApplicationForm 
            budget={budget}
            setBudget={setBudget}
            duration={duration}
            setDuration={setDuration}
            message={message}
            setMessage={setMessage}
            submitApplication={submitApplication}
          />}
          {(person.username === project.username ||
           project.selected_freelancer === person.username) && 
            <button 
            className='hire-applicant'
            style={{
              'maxHeight': '80px', 
              'padding': '3px',
              'marginTop': '20px'
              }}
              onClick={() => {
                props.history.push(`/projects/${props.match.params.project_index}/thread`)
              }}>
              <span 
              role='img'
              description='lightning'
              aria-labelledby=''
              >📄{' '}</span>
              Go to Work Thread
            </button>
          }
          </div>
          </>
        :
        <CircularProgress className={classes.progress} />
      }
    
      
    </div>
    
    </div>
  );
}

function ApplicationForm({ 
  budget, setBudget, 
  duration, setDuration, 
  message, setMessage,
  submitApplication
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
        <button 
        className='sort-apply'
        onClick={() => submitApplication()}>
          <span 
          role='img'
          description='lightning'
          aria-labelledby=''
          >📄{' '}</span>
           Submit Offer!
        </button>
    </div>
  );
}

function ApplicantsList({ 
  applications, 
  otherProps, 
  project,
  removeError,
  setErrorType
}){
  function updateFreelancer(username) {
    setErrorType('good')
    removeError('Attempting to Select Freelancer');
    Projects.fetchList({_id: project.project_id}).then(res => {
      if(res[0].attrs.step < 3){
      res[0].update({ selected_freelancer: username });
      res[0].save().then(result => {
         // console.log(result)
         setErrorType('good')
         removeError('Freelancer Selected');
         otherProps.history.push(`/projects/${otherProps.match.params.project_index}/thread`)
        }).catch(err => console.log(err));
      } else {
        setErrorType('bad')
        removeError('Freelancer Cannot be Replaced After Project Funding');
      }
    }).catch(err => {
      console.log(err)
      setErrorType('bad')
        removeError('An Error occurred, Please Try Again Later....');
    });
  }

  return(
  <div className="applicants-list">
    {
      applications.map(application => (
        <div className='periphery-applicant' key={application._id}>
          <span 
          role='img'
          description='lightning'
          aria-labelledby=''
          >💡{' '}</span>
        <div className='applicant-card'>
          <a href={`/freelancers/${application.attrs.applicant_username}`}>
            <h3>{application.attrs.applicant_username}</h3>
          </a>
          <h4>Budget: ${application.attrs.applicant_bid}</h4>
          <p>{application.attrs.applicant_message}</p>
        </div>
          <div className='buttons-stack'>
            {
            project.selected_freelancer !== application.attrs.applicant_username
            ?
            <button 
            className='hire-applicant'
            onClick={() => {
              updateFreelancer(application.attrs.applicant_username)
            }}>
            <span 
              role='img'
              description='lightning'
              aria-labelledby=''
              >🏆{' '}</span>Select Freelancer
              </button>
              :
              <button 
              className='hire-applicant'
              style={{ 'backgroundColor': 'gray'}}>
              <span 
                role='img'
                description='lightning'
                aria-labelledby=''
                >🏆{' '}</span>Already Selected
                </button>
              }
              <button 
              className='hire-applicant'
              onClick={() => {
                otherProps.history.push(`/messages/${application.attrs.applicant_username}`)
              }}
              >
            <span 
              role='img'
              description='lightning'
              aria-labelledby=''
              >💬{' '}</span>Start Conversation
              </button>
          </div>
        </div>
      ))
    }
  </div>);
}