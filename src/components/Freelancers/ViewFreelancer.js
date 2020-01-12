import React, { useState, useEffect } from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import Profile from '../../model/Profile';
import * as data from '../User/skillsData.json';
import pImage from '../../assets/avatar-1577909_960_720.webp';

const fields = { text: 'Name', value: 'Code' };

export default function ViewFreelancer(props) {
  const [person, setPerson] = useState({});

  useEffect(() => {
    Profile.fetchList({
      "username": props.match.params.username
    }).then(res => {
      if(res.length>0){

        const newPerson={
          summary: res[0].attrs.summary,
          rating: res[0].attrs.rating,
          image: res[0].attrs.image,
          username: res[0].attrs.username,
          name: res[0].attrs.name,
          skills: res[0].attrs.skills,
          completed: res[0].attrs.jobsDone,
          created: res[0].attrs.jobsCreated
        }

        setPerson(newPerson);
      }
    })
  }, [])

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return(
    <>
      {person ? 
      <UserHeader person={person} otherProps={props}/> 
      :
      <CircularProgress className={classes.progress} />
      }
    </>
  );
}

function UserHeader({ person, otherProps }) {
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

  return (
    <div className='profile-form'>
    {!person.skills ? (<CircularProgress className={classes.progress} />) :
    
    <>
    <div className='img-box'>
      { person.image ? 
        <img src={person.image} alt='profile'/> : 
        <img src={pImage} alt='profile'/>
      }
      </div>
    <div className='profile-info'>
      <div className='profile-stats'>
        <div className='stat-block'>
          <p className='c-num'>{person.completed}</p>
          <p className='j-num'>Jobs Done</p>
        </div>
        <div className='stat-block'>
          <p className='c-num'>{person.created}</p>
          <p className='j-num'>Jobs Created</p>
        </div>
      </div>
        <div className='profile-others'>
          <h2 className='name'>{person.name}</h2>
          <h3 className='username'>{person.username}</h3>
          <div className='ratings' ><StyledRating
            name="customized-color"
            value={5}
            // getLabelText={getLabelText}
            precision={0.5}
            icon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          /></div>
        </div>
        <div className='buttons'>
          
        {/* <button className='hire-button'>
          <FaBriefcase />
          HIRE
          </button> */}
          <button 
          className='msg-button'
          onClick={() => otherProps.history.push(`/messages/${person.username}`)}>
          <FaCommentAlt />{' '}
          MESSAGE
          </button>
        </div>
    </div>
    {/*  */}

    </>}
      <div className='profile-details'>
        
        <div className='projects'>

        </div>
      </div>
      {ProfileDetails(person.skills, person.summary, person.completed, person.created)}
    </div>
  );
}

function ProfileDetails(skills, summary, completed, created){
  function createMarkup() {
    return {__html: summary};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  
  return(
    <div className='profile-out-row'>
     
    <div className="profile-show">
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
        <div className='summary-text'>
          <MyComponent/>
        </div>
        </div>
    </div>
    </div>
  );
}