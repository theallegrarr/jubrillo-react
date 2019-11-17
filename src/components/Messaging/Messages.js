import React, {useEffect, useState} from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MessageSchema from '../../model/Message';
import { FaLocationArrow as LoloSend } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ErrorBar from '../errorBar/errorBar';

export default function Messages (props) {
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState([]);
  const [mode, setMode] = useState(1);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState('bad');
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '20%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => {
      if(person.username && props.match.params.other_person){
        getMessages(messages, setMessages, props, person, setMode);
      } else {
        getAll(messages, setMessages)
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  return(
  <>
    <div className="sidenav">
      <h4>Chat history</h4>
      {messages.length>0 ? 
      <AllChats 
      username={person.username} 
      messages={messages}/>
      :
      <CircularProgress className={classes.progress} />
      }
    </div>
    <div className='chat-container'>
    {props.match.params.other_person ? <h3>Messaging with 
        <a href={`/freelancers/${props.match.params.other_person}`}>
          {`(${props.match.params.other_person})`}
        </a>
      </h3> : ''}
        {errorMessage && 
        <ErrorBar 
        errorMessage={errorMessage}
        errorType={errorType}
        removeError={removeError}
        />}
        {props.match.params.other_person ? <MessageContainer 
          person={person}
          typedMessage={typedMessage}
          setTypedMessage={setTypedMessage}
          otherProps={props}
          setErrorType={setErrorType}
          removeError={removeError}
          mode={mode}
          messages={messages}
        /> : <h2>Find A Freelancer to Chat With</h2>}
    </div>
  </>);
}


function MessageContainer ({
  person,
  typedMessage,
  otherProps,
  setErrorType,
  removeError,
  mode,
  messages,
  setTypedMessage
}) {


  return(
    <div className='project-view-page'>
      
      <div className='messages-thread' id='chat-history'>
        {
          messages.length > 0 ?
          <MessageCard 
            messages={messages}
            person={person} 
            className='chat-page-thread'
            id='scroller'
            setErrorType={setErrorType}
            removeError={removeError}
            otherProps={otherProps}
            />
          : <p>Loading....</p>
        }
      </div>
      <ClassicEditorFunction 
        className='classic-editor'
        typedMessage={typedMessage}
        person={person}
        setTypedMessage={setTypedMessage}
        setErrorType={setErrorType}
        removeError={removeError}
        otherProps={otherProps}
        />
    </div>)
}

async function getMessages(messages, 
  setMessages, 
  props,  
  person,
  setMode){
  try {
    const allThreadMessages  = await MessageSchema
    .fetchList({
      "from": person.username,
      "to": props.match.params.other_person,
      "chat_message": true
    });
    const allThreadMessages2  = await MessageSchema
    .fetchList({
      "from": props.match.params.other_person,
      "to": person.username,
      "chat_message": true
    });

    const newArray = 
    allThreadMessages.concat(allThreadMessages2)
    .sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.attrs.createdAt) - new Date(a.attrs.createdAt);
    });

    //console.log(allThreadMessages, allThreadMessages2, newArray)
    if(newArray) {
      setMessages(newArray)
    }
  } catch (error) {
    console.log(error)
  } 
}

function ClassicEditorFunction({
  person,
  typedMessage,
  otherProps,
  setErrorType,
  removeError,
  mode,
  setTypedMessage
}){
  const addMessage = () => {
    removeError('Sending Message....');
    setErrorType('good');
    const newMessage = new MessageSchema({
      body: typedMessage,
      from: person.username,
      to: otherProps.match.params.other_person,
      project_message: false,
      chat_message: true
    });

    return newMessage.save().then(res => {
      //console.log(res)
      setTypedMessage('');
      removeError('Message Sent');
      setErrorType('good');

      return res;
    }).catch(err => {
      console.log(err)
      removeError('Message Sending Failed');
      setErrorType('bad');
    });
  }

  return(
    <>
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data={typedMessage}
          style={{'height': '150px'}}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              // console.log( { event, editor, data } );
              setTypedMessage(data);
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

function MessageCard({ messages, person, otherProps }){
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
          {msg.attrs.from===person.username ? 'You' : otherProps.match.params.other_person}</p>
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

function AllChats({ username, messages }){

  return(
    <>
      {
        messages.map(message => (
          <a href={`/messages/${message.attrs.from === username ? message.attrs.to : message.attrs.from}`}
          key={message.attrs._id}>
            {message.attrs.from === username ? message.attrs.to : message.attrs.from}
          </a>
        ))
      }
    </>
  )
}

async function getAll(username, setMessages) {
  try {
    const allThreadMessages2  = await MessageSchema
    .fetchList({
      "to": username,
      "chat_message": true,
      "limit": 100,
      "sort": '-createdAt'
    });

    
    //console.log(allThreadMessages, allThreadMessages2, newArray)
    if(allThreadMessages2) {
      setMessages(allThreadMessages2)
    } 
  } catch (error) {
    console.log(error)
  } 
}