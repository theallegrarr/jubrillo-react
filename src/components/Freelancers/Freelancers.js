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

  return(
    <>
      <div className="sidenav">
        <p>Sort By Skills: </p>
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
            src={freelancer.attrs.image} 
            alt='headshot'/>
            <div className='other-fdetails'>
            <h2>{freelancer.attrs.name}</h2>
            <div className='ratings' ><p>Rating:   <StyledRating
              name="customized-color"
              value={freelancer.attrs.rating}
              // getLabelText={getLabelText}
              precision={0.5}
              icon={<StarBorderIcon fontSize="inherit" />}
              readOnly
            /></p></div>
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