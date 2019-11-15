import React, {useEffect,useState} from 'react';
import Projects from '../../model/Project';
import Profile from '../../model/Profile';
import Message from '../../model/Message';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaLocationArrow as LoloSend } from 'react-icons/fa';
import FundSchema from '../../model/FundingJob';

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
  const [message, setMessage] = useState('');

  useEffect(() => {
    updateAllInfo();
  }, [])

  const updateAllInfo = async () => {
    try {
      const res = await Projects.fetchList({"project_index": props.match.params.project_index})
      if(res.length>0){
        //console.log(res)
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
          freelancer_username: res[0].attrs.selected_freelancer,
          project_index: props.match.params.project_index
        }
        // console.log(project)
        setProject(project);
        setActiveStep(project.step);

        const user = await Profile.fetchList({ username: res[0].attrs.employer_username })
        setEmployer(user[0].attrs)  

        const applicantData = await Profile.fetchList({ username: res[0].attrs.selected_freelancer })
        setApplicant(applicantData[0].attrs)

        const messagesData = await Message.fetchList({project_id: project.project_id,sort: '-createdAt'});
        setMessages(messagesData);
        
        if(person.username !== project.username &&
            project.freelancer_username !== person.username){
          props.history.push(`/projects/${props.match.params.project_index}`)
        }
      }
    } catch (err){
      console.log(err);
    }
  }

  return(
    <div className='project-container'>
      <LeftSideBar
        project={project}
        messages={messages}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        message={message}
        setMessage={setMessage}
        person={person}
        employer={employer}
        applicant={applicant}
        setMessages={setMessages}
      />
      <RightSideBar 
      employer={employer}
      applicant={applicant}
      project={project}
      person={person}
      />
    </div>
  );
}


function RightSideBar ({employer, applicant, project, person}){
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return (
  <>
  <div className='employer-info'>
    <div className='fund-opts'>
      <p
       className='balance-name'
      ><span 
        role='img'
        description='money'
        aria-labelledby=''>💸{' '}</span>Job Balance: {
        project.balance ? project.balance : 0
        }</p>
        { project.username === person.username &&
        <div className='fund-buttons'>
          <button 
          style={{ 'backgroundColor': 'green'}}
          onClick={() => {

          }}>
            Refresh Balance
          </button>
          <button 
          onClick={() => {

          }}>
            Add Funds
          </button>
        </div>
        }
    </div>
    <a 
    href={`/freelancers/${employer.username}`}>
      <p className='employer-name'><span 
        role='img'
        description='money'
        aria-labelledby=''
        className='employer-name'>🏢{' '}</span>
          Employer: {employer.username}</p></a>
    <p><span 
        role='img'
        description='money'
        aria-labelledby=''>⌛ {' '}</span>Jobs Created: {employer.jobsCreated}</p>
    <p><span 
        role='img'
        description='money'
        aria-labelledby=''>⏲️{' '}</span>
        Employer Account was Created: {timeAgo.format(Date.now() - (Date.now()-employer.createdAt))}
        </p>
  {/* </div>
  <div className='employer-info'> */}
    <a 
    href={`/freelancers/${applicant.username}`}>
      <p
       className='employer-name'
      ><span 
        role='img'
        description='money'
        aria-labelledby=''>🛠️{' '}</span>Freelancer: {applicant.username}</p></a>
    <p><span 
        role='img'
        description='money'
        aria-labelledby=''>⌛ {' '}</span>Jobs Done: {applicant.jobsDone}</p>
    <p><span 
        role='img'
        description='money'
        aria-labelledby=''>⏲️{' '}</span>Freelancer Account was Created: {timeAgo.format(Date.now() - (Date.now()-applicant.createdAt))}</p>
  </div>
  </>);
}

function LeftSideBar({ 
  project, 
  messages, 
  activeStep, 
  setActiveStep,
  message,
  setMessage, setMessages,
  person, employer, applicant
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
      setActiveStep={setActiveStep}
      person={person}/>
    </div>
    <div className='messages-thread' id='chat-history'>
      {
        messages.length > 0 ?
        <Messages 
          messages={messages}
          project={project}
          person={person} 
          className='chat-thread'
          id='scroller'
          
          />
        : <p>Loading....</p>
      }
    </div>
    <ClassicEditorFunction 
      className='classic-editor'
      message={message}
      setMessage={setMessage}
      person={person}
      employer={employer}
      applicant={applicant}
      project={project}
      setMessages={setMessages}
      />
  </div>)
}

function HorizontalLinearStepper({ 
  project, 
  activeStep, 
  setActiveStep,
  person  }) {
  const classes = useStyles();
  const steps = getSteps();

  const handleNext = () => {
    
    Projects.fetchList({
      "_id": project.project_id
    }).then(res => {
      if(res.length>0){
        //console.log(res)
        res[0].update({ step: activeStep+1});
        res[0].save().then(resp => {
          //console.log(resp)
          setActiveStep(activeStep+1)
        }).catch(err =>  console.log(err))
      }
    }).catch(err => console.log(err));
  };

  return (
    <div className={classes.root}>
      <Stepper 
      activeStep={activeStep} 
      alternativeLabel
      className='stepper'
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
            {/* <Button onClick={handleReset}>Reset</Button> */}
          </div>
        ) : (
          <div>
            { project.username === person.username &&
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            }
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button> */}
              { project.username === person.username &&
              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleNext}
              className='next-button'>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ClassicEditorFunction(props){
  const addMessage = () => {
    const newMessage = new Message({
      body: props.message,
      from: props.person.username,
      to: props.person.username === props.employer.employer_username ? props.applicant.username : props.project.freelancer_username,
      project_message: true,
      chat_message: false,
      project_id: props.project.project_id
    });

    return newMessage.save().then(res => {
      console.log(res)
      
      Message.fetchList({
        project_id: props.project.project_id,
        sort: '-createdAt',
      }).then(res => {
        console.log(res)
        props.setMessages(res);
      }).catch(err=> console.log(err))

      return res;
    }).catch(err => console.log(err));
  }

  return(
    <>
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data={props.message}
          style={{'height': '150px'}}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              // console.log( { event, editor, data } );
              props.setMessage(data);
          } }
          onBlur={ ( event, editor ) => {
              //console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              //console.log( 'Focus.', editor );
          } }
      />
  </div>
  <div className='send-message'>
    <button
      onClick={() => {
        addMessage();
      }}
><LoloSend />{' '}Send</button>
  </div>
  </>
  );
}

function Messages({ messages, person, project }){
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
    <>
    {
    messages.map(msg => (
      <div key={msg._id} 
      className='message-box'
      style={{
        'marginLeft': msg.attrs.from===person.username ? '0': '20%',
        'marginRight': msg.attrs.from===person.username ? '20%': '0',
        'textAlign': msg.attrs.from===person.username ? 'left': 'right',
      }}>
        <div 
        className='msg-details'
        style={{
          'textAlign': msg.attrs.from===person.username ? 'left': 'right',
          'justifyContent': msg.attrs.from===person.username ? 'flexStart': 'flexEnd',
          'alignSelf': msg.attrs.from===person.username ? 'flex-start': 'flex-end'
        }}
        >
          <p className='msg-from'>from: 
          {msg.attrs.from===person.username ? 'You' : msg.attrs.from}</p>
          <p className='msg-time'>{timeAgo.format(Date.now() - (Date.now()-msg.attrs.createdAt))}</p>
        </div>
        <div className='p-text'><MyComponent data={msg.attrs.body}/></div>
      </div>))
    }
    <div id="anchor"></div>
  </>);
}

function MyComponent({ data }) {
  return <div dangerouslySetInnerHTML={{__html: data}} />;
}