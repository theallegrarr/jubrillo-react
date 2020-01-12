import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MessageSchema from '../../model/Message';
import LastCheck from '../../model/LastCheck';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ErrorBar from '../errorBar/errorBar';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';

export default function Notifications(props) {
  const [latests, setLatests] = useState([]);
  const [offset, setOffset] = useState(0);
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
    checkNotifications(setLatests, 
      person.username,
      0,
      removeError,
      setErrorType);
      
    updateTime();
  }, [])

  async function updateTime(){
    try {
      const existingCheck = await LastCheck.fetchList({ owner: person.username })
      // console.log(existingCheck)
      if(existingCheck.length > 0){
        existingCheck[0].update({ message: `last checked at ${Date.now()}`})
        await existingCheck[0].save()
        //console.log(updateChecker)
      } else {
        const checker = new LastCheck({
          message: `last checked at ${Date.now()}`,
          owner: person.username
        })

        await checker.save()
        //console.log(saveCheck)
      }
    } catch (error){
      console.log(error)
    }
  }

  const nextPage = () => {
    removeError('Trying to go forward')
    setErrorType('good')
    checkNotifications(setLatests, 
      person.username, 
      offset+20,
      removeError,
      setErrorType)
    setOffset(offset+20);
  }

  const prevPage = () => {
    removeError('Trying to go back')
    setErrorType('good')
    if(offset>=20){
    checkNotifications(setLatests, 
      person.username, 
      offset-20,
      removeError,
      setErrorType)
    setOffset(offset-20);
    } else {
      removeError('This is the first page')
      setErrorType('good')
    }
  }

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
  <div className='notifications-container'>
    {errorMessage && 
     <ErrorBar 
     errorMessage={errorMessage}
     errorType={errorType}
     removeError={removeError}
     />}
    <h3>Notifications</h3>
      <div className='not-list'>
        {
        latests.length > 0 ?
        latests.map(latest => (
          <div 
          className='notif-item'
          key={latest.attrs._id}>
            <div>
              {
                latest.attrs.project_message ? 
                <NavLink 
                to={`/projects/${latest.attrs.project_index}/thread`}
                key={uuid}>Project Thread </NavLink>
                :
                <NavLink 
                to={`/messages/${latest.attrs.from}`}
                key={uuid}
                >Chat Thread 
                </NavLink>
              }
            </div>
            <div>
              <MyComponent html={latest.attrs.body} />
            </div>
            <div>
              <p className='time-ago from'>from {latest.attrs.from}</p>
            </div>
            <div>
              <p className='time-ago'>received {timeAgo.format(Date.now() - (Date.now()-latest.attrs.createdAt))}</p>
            </div>
          </div>
        ))
        :
        <CircularProgress className={classes.progress} />
        }
      </div>
      <div className='paginate-buttons'>
        {latests.length >=20 && <button
          onClick={() => {
            nextPage()
          }}
        >Next Page</button>}
        {offset>=20 && <button
          onClick={() => {
            prevPage()
          }}
        >Prev. Page</button>}
      </div>
  </div>)
}

async function checkNotifications(
  setLatests, 
  username, 
  offsetValue,
  removeError,
  setErrorType) {
  try {
    const allThreadMessages = await MessageSchema.fetchList({
      to: username,
      sort: '-createdAt',
      limit: 20,
      offset: offsetValue > 0 ? offsetValue : 0
    })
    //console.log(allThreadMessages)
    if(allThreadMessages.length > 0) {
      setLatests(allThreadMessages);
    } else {
      setLatests(allThreadMessages);
      setErrorType(`good`)
      removeError(`No More Notifications!`)
    }
  } catch (error) {
    console.log(error);
    setErrorType(`bad`)
    removeError(`Failed to Fetch Notifications!`)
  }
}

function createMarkup(html) {
  return {__html: html};
}

function MyComponent({html}) {
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
}