import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import MessageSchema from '../../model/Message';

export default function Notifications(props) {
  const [latests, setLatests] = useState([]);
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
      checkNotifications(setLatests, person.username);
  }, [])

  return(<>
    <h3>Notifications</h3>
    {
      latests.length > 0 ?
      latests.map(latest => (
        <div 
        className='notif-item'
        key={latest.attrs._id}>
          <p>{latest.attrs.body}</p>
        </div>
      ))
      :
      <CircularProgress className={classes.progress} />
    }
  </>)
}

async function checkNotifications(setLatests, username) {
  try {
    const allThreadMessages = await MessageSchema.fetchList({
      to: username,
      sort: '-createdAt',
      limit: 20
    })
    console.log(allThreadMessages)
    setLatests(allThreadMessages);
  } catch (error) {
    console.log(error);
  }
}