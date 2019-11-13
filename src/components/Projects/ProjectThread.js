import React, {useEffect,useState} from 'react';
import Projects from '../../model/Project';
import Profile from '../../model/Profile';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
    fontSize: '12pt'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: '14pt'
  }
}));

function getSteps() {
  return [
   getStepContent(0), 
   getStepContent(1), 
   getStepContent(2),
   getStepContent(3),
   getStepContent(4)
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select a Freelancer';
    case 1:
      return 'Reach agreement with Freelancer';
    case 2:
      return 'Fund Job Based on Agreement';
    case 3:
      return 'Work In Progress';
    case 4:
      return 'Release Payment';
    default:
      return 'Freelancer Selected';
  }
}

export default function ProjectThread (props) {
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;
  const [project, setProject] = useState([]);
  const [employer, setEmployer] = useState([]);
  const [applicant, setApplicant] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  

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
          freelancer_username: res[0].attrs.selected_freelancer
        }
        // console.log(project)
        setProject(project);
        setActiveStep(project.step);
        Profile.fetchList({ username: res[0].attrs.employer_username })
          .then(user => {
            setEmployer(user[0].attrs)  
          }).catch(err => {
            console.log(err);
          })

        Profile.fetchList({ username: res[0].attrs.selected_freelancer })
        .then(user => {
          setApplicant(user[0].attrs)  
        }).catch(err => {
          console.log(err);
        })
        
          if(person.username !== project.username &&
             project.freelancer_username !== person.username){
            props.history.push(`/projects/${props.match.params.project_index}`)
        }
      }
    }).catch(err => console.log(err))
  }, [])

  return(
    <div className='project-container'>
      <LeftSideBar
        project={project}
        messages={messages}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <RightSideBar 
      employer={employer}
      applicant={applicant}/>
    </div>
  );
}


function RightSideBar ({employer, applicant}){
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return (
  <>
  <div className='employer-info'>
    <a 
    href={`/freelancers/${employer.username}`}>
      <p>Employer: {employer.username}</p></a>
    <p>Jobs Created: {employer.jobsCreated}</p>
    <p>Employer Account was Created: {timeAgo.format(Date.now() - (Date.now()-employer.createdAt))}</p>
  {/* </div>
  <div className='employer-info'> */}
    <a 
    href={`/freelancers/${applicant.username}`}>
      <p>Freelancer: {applicant.username}</p></a>
    <p>Jobs Done: {applicant.jobsDone}</p>
    <p>Freelancer Account was Created: {timeAgo.format(Date.now() - (Date.now()-applicant.createdAt))}</p>
  </div>
  </>);
}

function LeftSideBar({ 
  project, 
  messages, 
  activeStep, 
  setActiveStep 
}){

  return(
  <div className='project-view-page'>
    <h2><span 
    role='img'
    description='lightning'
    aria-labelledby=''>💼{' '}</span>
    {project.title}</h2>
    <div className='work-steps'>
      <HorizontalLinearStepper 
      project={project}
      activeStep={activeStep}
      setActiveStep={setActiveStep}/>
    </div>
  </div>)
}

function HorizontalLinearStepper({ 
  project, 
  activeStep, 
  setActiveStep  }) {
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper 
      activeStep={activeStep} 
      alternativeLabel
      >
        {steps.map(label => (
          <Step 
          key={label} >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNext}
              className='next-button'>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}