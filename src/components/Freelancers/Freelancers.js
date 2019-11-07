import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Profile from '../../model/Profile';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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
      res.forEach(value => {
        
        const newfreelancer = {
          isFreelancer: value.attrs.isFreelancer,
          name: value.attrs.name,
          skills: value.attrs.skills,
          jobsDone: value.attrs.jobsDone,
          rating: value.attrs.rating,
          username: value.attrs.username,
          _id: value.attrs._id,
          email: value.attrs.email
        };

        newList=newList.concat(newfreelancer);
        setFreelancers(freelancers.push(newfreelancer));
        setFreelancers(freelancers);
        console.log(freelancers);
      })
    }).catch(err => console.log(err))

  }, [])

  return(
    <div className='freelancers-container'>
      {
        freelancers.length > 0 ? 
        (<FreelancersList freelancers={freelancers}/>)
        :
        (<CircularProgress className={classes.progress} />)
      }
    </div>
  )
}

const FreelancersList = (props) => {
  let cards=[];
  for (var i = 0; i < props.freelancers.length; i++) {
    console.log(props.freelancers);
    cards.push(
      <span className='indent' key={i}>
        <h1> {props.freelancers[i].name} </h1>
      </span>
    );
  }

  return cards;
}