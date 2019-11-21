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
import VerifyTxn from '../../payments/initiateTxn';
import Popup from './PaymentPopUp';
import CustomMessages from './StepMessage';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorBar from '../errorBar/errorBar';
import Review from '../Projects/Review';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
      return 'Select a Freelancer to Start Thread';
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
  const [form, setForm] = useState({
    transaction_id: '',
    usdAmount: 0
  });
  const [popDisp, setPopDisp] = useState(false);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState('bad');
  const [sentReview, setSent] = useState({});
  const [receivedReview, setReceived] = useState({});
  

  useEffect(() => {
    const interval = setInterval(() => {
      updateAllInfo();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  const refreshPayment = () => {
    removeError('Checking Payment Status....');
    setErrorType('good');
    if(form.transaction_id){
      VerifyTxn(project.project_id, form.transaction_id)
        .then(res => {
          //console.log(res)
          if(res){
            removeError('Payment Confirmed');
            setErrorType('good');
            updateAllInfo();
          }else {
            removeError('Unable to Confirm the Payment, Ensure that the transaction ID has been set');
            setErrorType('bad');
          }
        }).catch(err => {
          console.log(err)
          removeError('Unable to Confirm the Payment, Ensure that the transaction ID has been set');
          setErrorType('bad');
        })
    } else {
      removeError(`Set the Transaction ID in the 'Add Funds' Form Before clicking Refresh`);
      setErrorType('bad');
    }
  }

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '15%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

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
          project_index: props.match.params.project_index,
          balance: res[0].attrs.work_balance
        }
        //console.log(project)
        if(!project.freelancer_username||project.freelancer_username === undefined){
          props.history.push(`/projects/${props.match.params.project_index}`)
        }
        // console.log(project)
        setProject(project);
        setActiveStep(project.step);

        const user = await Profile.fetchList({ username: res[0].attrs.employer_username })
        setEmployer(user[0].attrs)  

        const applicantData = await Profile.fetchList({ username: res[0].attrs.selected_freelancer })
        setApplicant(applicantData[0].attrs)

        const messagesData = await Message.fetchList({project_id: project.project_id,sort: '-createdAt'});
        //console.log(messagesData)
        setMessages(messagesData);

        if(project.step === 4 && project.freelancer_username === person.username){
          const jobsCompleted = applicantData[0].attrs.jobsCompleted;
          //console.log(jobsCompleted.find(a => a === project.project_index))
          if(!jobsCompleted || !jobsCompleted.find(a => a === project.project_index)){
            const newValue = jobsCompleted ? 
              jobsCompleted.push(project.project_index)
              : [project.project_index];
            applicantData[0].update({ jobsCompleted: newValue });
            const updateJobs = await applicantData[0].save()
            //console.log(updateJobs)
          }
        }
        
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
     {errorMessage && 
     <ErrorBar 
     errorMessage={errorMessage}
     errorType={errorType}
     removeError={removeError}
     />}
     {project.title ?  
      <>
        {
          popDisp && <Popup 
            project={project}
            person={person}
            form={form}
            setForm={setForm}
            setPopDisp={setPopDisp}/>
        }
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
        update={updateAllInfo}
        setErrorType={setErrorType}
        removeError={removeError}
        />
        <RightSideBar 
        employer={employer}
        applicant={applicant}
        project={project}
        person={person}
        setPopDisp={setPopDisp}
        refreshPayment={refreshPayment}
        sentReview={sentReview}
        receivedReview={receivedReview}
        setSent={setSent}
        setReceived={setReceived}
        />
      </>
    : <CircularProgress className={classes.progress} />
    }
    </div>
  );
}


function RightSideBar ({
  employer, applicant, project, person, setPopDisp, refreshPayment,
  sentReview, receivedReview, setSent, setReceived
}){
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
            refreshPayment()
          }}>
            Refresh Balance
          </button>
          {project.step<4 && 
          (<button 
            onClick={() => {
            setPopDisp(true);
          }}>
            Add Funds
          </button>)
          }
        </div>
        }
    </div>
    {project.step>=4 &&
    <Review 
      project={project}
      person={person}
      sentReview={sentReview}
      receivedReview={receivedReview}
      setSent={setSent}
      setReceived={setReceived}
    />}
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
        aria-labelledby=''>⌛ {' '}</span>Jobs Done: {
        applicant.jobsCompleted ?
        applicant.jobsCompleted.length : 0}</p>
    <p><span 
        role='img'
        description='money'
        aria-labelledby=''>⏲️{' '}</span>Freelancer Account was Created: {timeAgo.format(Date.now() - (Date.now()-applicant.createdAt))}</p>
    <div 
    className="alert"
    style={project.step === 4 ? 
      {backgroundColor: 'green'}
      :
      {backgroundColor: 'red'}
    }>
    <span 
        role='img'
        description='money'
        aria-labelledby=''>ℹ️{'   '}
        {employer.username === person.username ? 
        CustomMessages(project.step, 'employer') :
        CustomMessages(project.step, 'freelancer')
        }</span>
    </div>
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
  person, employer, applicant, update,
  setErrorType, removeError
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
      person={person}
      update={update}/>
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
          setErrorType={setErrorType}
          removeError={removeError}
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
      setErrorType={setErrorType}
      removeError={removeError}
      />
  </div>)
}

function HorizontalLinearStepper({ 
  project, 
  activeStep, 
  setActiveStep,
  person, update  }) {
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
          update()
        }).catch(err =>  console.log(err))
      }
    }).catch(err => console.log(err));
  };

  const handleBack = () => {
    
    Projects.fetchList({
      "_id": project.project_id
    }).then(res => {
      if(res.length>0){
        //console.log(res)
        if(activeStep>1){
          res[0].update({ step: activeStep-1});
          res[0].save().then(resp => {
          //console.log(resp)
            setActiveStep(activeStep-1)
          }).catch(err =>  console.log(err))
        }
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
              {activeStep>1 && activeStep<4 && <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>}
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
    props.removeError('Sending Message....');
    props.setErrorType('good');
    
    const newMessage = new Message({
      body: props.message,
      from: props.person.username,
      to: props.person.username === props.project.username ? props.project.freelancer_username : props.project.username,
      project_message: true,
      chat_message: false,
      project_id: props.project.project_id,
      project_index: props.project.project_index
    });
    console.log(newMessage);

    return newMessage.save().then(res => {
      //console.log(res)
      props.setMessage('');
      props.removeError('Message Sent');
      props.setErrorType('good');
      Message.fetchList({
        project_id: props.project.project_id,
        sort: '-createdAt',
      }).then(res => {
        props.setMessages(res);
      }).catch(err=> {
        console.log(err)
        props.removeError('Message Fetch Failed, Please Refresh Page');
        props.setErrorType('bad');
      })

      return res;
    }).catch(err => {
      console.log(err)
      props.removeError('Message Sending Failed');
      props.setErrorType('bad');
    });
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