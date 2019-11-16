import React, { useState, useEffect } from 'react';
import { FaCommentAlt, FaBriefcase } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import Profile from '../../model/Profile';
import * as data from '../User/skillsData.json';

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
    <div className='profile-info'>
      <img src={person.image ? person.image : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`} alt='profile'/>
        <div className='profile-others'>
          <h2 className='name'>{person.name}</h2>
          <h3 className='username'>{person.username}</h3>
          <div className='ratings' ><p>Ratings:   <br/><StyledRating
            name="customized-color"
            value={person.rating}
            // getLabelText={getLabelText}
            precision={0.5}
            icon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          /></p></div>
          
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
      {ProfileDetails(person.skills, person.summary)}
    </div>
  );
}

function ProfileDetails(skills, summary){
  function createMarkup() {
    return {__html: summary};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }
  
  return(
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
        <div className='summary-view'>
          <MyComponent/>
        </div>
        </div>
    </div>
  );
}