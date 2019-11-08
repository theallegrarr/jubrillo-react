import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Profile from '../../model/Profile';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import * as data from '../User/skillsData.json';

export default function Freelancers(props) {
  const [freelancers, setFreelancers] = useState([]);
  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    let newList=[];
    Profile.fetchList({
      "isFreelancer": true
    }).then(res => {
      console.log(res)
      
        
        // const newfreelancer = {
        //   isFreelancer: value.attrs.isFreelancer,
        //   name: value.attrs.name,
        //   skills: value.attrs.skills,
        //   jobsDone: value.attrs.jobsDone,
        //   rating: value.attrs.rating,
        //   username: value.attrs.username,
        //   _id: value.attrs._id,
        //   email: value.attrs.email,
        //   image: value.attrs.image
        // };

        // newList=newList.concat(newfreelancer);
        // setFreelancers(freelancers.push(newfreelancer));
        setFreelancers(freelancers.concat(res));
        //console.log(freelancers);

    }).catch(err => console.log(err))

  }, [])

  return(
    <div className='freelancers-container'>
      {
        freelancers.length > 0 ? 
        (<FreelancersList freelancers={freelancers} key='311' />)
        :
        (<CircularProgress className={classes.progress} />)
      }
    </div>
  )
}

//const fields = { text: 'Name', value: 'Code' };
const FreelancersList = (props) => {
  
  return (
    <div key="312">
      {
        props.freelancers.map(freelancer => (
          <div key={freelancer.attrs._id}>>
            <h2>{freelancer.attrs.name}</h2>
            <p>{freelancer.attrs.skills}</p>
          </div>
          ))
      }
    </div>
  );
}