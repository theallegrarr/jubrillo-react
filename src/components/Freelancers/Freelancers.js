import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Profile from '../../model/Profile';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as data from '../User/skillsData.json';

const fields = { text: 'Name', value: 'Code' };

export default function Freelancers(props) {
  
  const [rateSort, setRate] = useState(0);
  const [skills, setSkills] = useState([]);
  const [completedJobs, setCompleted] = useState();
  const [freelancers, setFreelancers] = useState([]);


  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '300px',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    Profile.fetchList({
      "isFreelancer": true
    }).then(res => {
      console.log(res)
      setFreelancers(res);
    }).catch(err => console.log(err))

  }, [])

  const StyledRating = withStyles({
    iconFilled: {
      display: 'flex',
      color: '#FF3366',
      fontSize: '15pt',
      alignSelf: 'center',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

  return(
    <>
      <div className="sidenav">
        <p>Select Skills: </p>
        <div className='control-section'>
          <div 
            id='multidefault' 
            className="control-styles">
            <MultiSelectComponent 
            id="customelement" 
            dataSource={data.skills} 
            fields={fields} mode="Box"
            placeholder="Select Skills" 
            value={skills}
            style={{ "borderBottom": "none" }}
            onchange={(e) => setSkills(e.value)}
            />
          </div>
        </div>
        <p>Min Jobs Completed: </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Enter a number'
        value={completedJobs}
        onChange={(e) => {
          setCompleted(e.target.value);
        }}
        ></input>
        <p>Min Rating: </p>
        <StyledRating
              name="customized-color"
              value={rateSort}
              // getLabelText={getLabelText}
              precision={0.5}
              onChange={(event, newValue) => {
                setRate(newValue);
              }}
              icon={<StarBorderIcon 
                fontSize="large" />}
            />
        <div className='sort-actions'>
          <button className='sort-apply'>Apply</button>
          <button 
          className='sort-apply reset'
          onClick={() => {
            setSkills([])
            setCompleted(0)
            setRate(0)
          }}>
            Reset
          </button>
        </div>
      </div>
      <div className='freelancers-container'>
        
        {
          freelancers.length > 0 ? 
          (<FreelancersList freelancers={freelancers} key='311' />)
          //(<CircularProgress className={classes.progress} />)
          :
          (<CircularProgress className={classes.progress} />)
        }
      </div>
    </>
  )
}

//const fields = { text: 'Name', value: 'Code' };
const FreelancersList = (props) => {
   
  const StyledRating = withStyles({
    iconFilled: {
      display: 'flex',
      color: '#FF3366',
      fontSize: '15pt',
      alignSelf: 'center',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

  return (
    <div key="312" className='freelancers-list'>
      {
        props.freelancers.map(freelancer => (
          <div 
          key={freelancer.attrs._id} 
          className='freelancer-card'>
            <img 
            src={freelancer.attrs.image ? freelancer.attrs.image : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`} 
            alt='headshot'/>
            <div className='other-fdetails'>
            <a 
            className='name-link'
            href={`/freelancers/${freelancer.attrs.username}`}>
            {freelancer.attrs.name ? freelancer.attrs.name : freelancer.attrs.username}
            </a>
            <div className='ratings' >
              <StyledRating
              name="customized-color"
              value={freelancer.attrs.rating}
              // getLabelText={getLabelText}
              precision={0.5}
              icon={<StarBorderIcon fontSize="inherit" />}
              readOnly
            /></div>
            <div className='control-pane'>
            <div className='control-section'>
                <div id='multidefault' className="control-styles">
                  <MultiSelectComponent 
                  id="customelement" 
                  dataSource={data.skills} 
                  fields={fields} mode="Box"
                  value={freelancer.attrs.skills}
                  placeholder="Your Skills" 
                  readonly={true}
                  />
                </div>
            </div>
          </div>
            </div>
          </div>
          ))
      }
    </div>
  );
}