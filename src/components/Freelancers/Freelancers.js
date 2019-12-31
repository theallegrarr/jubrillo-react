import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import Profile from '../../model/Profile';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as data from '../User/skillsData.json';
import ErrorBar from '../errorBar/StatusBar';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';
import { FaAlignJustify } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import SEO from 'react-seo-component';
import navimage from '../../assets/logo.png';

const fields = { text: 'Name', value: 'Code' };

export default function Freelancers(props) {
  
  const [rateSort, setRate] = useState(0);
  const [skills, setSkills] = useState([]);
  //const [completedJobs, setCompleted] = useState(0);
  const [freelancers, setFreelancers] = useState([]);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState(''); 

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
       //console.log(res)
      setFreelancers(res);
    }).catch(err => console.log(err))

  }, [])

  function sortSelectedSkills(list,skills){
    let newList=[];
    for(let i=0; i< list.length; i++){
      if(checker(skills, list[i].attrs.skills)){
        //console.log(list[i])
        newList.push(list[i])
      }
    };
    return newList;
  }

  const checker = (arr, target) => {
    for(let j=0; j<skills.length; j++){
      //console.log(target.indexOf(skills[j]))
      if(target.indexOf(skills[j])<0)return false;
    }
    return true;
  };

  

  async function sortFreelancers(e){
    e.preventDefault();
    setErrorType('loading')
    removeError('Refining the list of Freelancers')
    try {
      let sortedList=[];
      if(skills.length === 0){
        sortedList = await Profile.fetchList({
          // jobsDone: { $size: completedJobs-1 },
          rating: { $gt: rateSort-1 }
        })
      } else {
        sortedList = await Profile.fetchList({
          // jobsDone: { $size: completedJobs-1 },
          //rating: { $gt: rateSort-1 },
          rating: { $gt: rateSort-1 },
          offset: 0
            // Do something here
         });
        //console.log(sortedList)
        sortedList = await sortSelectedSkills(sortedList,skills)
        //console.log(sortedList)
      }
      
      
      if(sortedList.length >0){
        setFreelancers(sortedList)
        setErrorType('good')
        removeError('List Updated')
      } else {
        setErrorType('bad')
        removeError('No Freelancers Matching Your Selection')
      }
    } catch(error) {
      console.log(error.message)
      setErrorType('bad')
      removeError('Sort Failed')
    }
  }

  async function resetList(){
    setErrorType('loading')
    removeError('Fetching default list')
    Profile.fetchList({
      "isFreelancer": true
    }).then(res => {
      // console.log(res)
      setFreelancers(res);
      setErrorType('good')
      removeError('List updated')
    }).catch(err => console.log(err))
  }

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
      <SEO
        title={'Jubrillo'}
        description={'All Open Projects'}
        image={navimage}
        pathname={'www.jubrillo.work/projects'}
        siteLanguage={'en'}
        siteLocale={'en_gb'}
        twitterUsername={'jubrillowork'}
      />
      <Helmet>
        <title>{`Jubrillo - All Freelancers`}</title>
      </Helmet>
      
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
            change={(e) => setSkills(e.value)}
            />
          </div>
        </div>
        {/* <p>Min Jobs Completed: </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Enter a number'
        value={completedJobs}
        onChange={(e) => {
          setCompleted(e.target.value);
        }}
        ></input> */}
        <p className='p-min-rating'>Min Rating: </p>
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
          <button 
          className='sort-apply'
          onClick={(e) => sortFreelancers(e)}>Apply</button>
          <button 
          className='sort-apply reset'
          onClick={() => {
            resetList()
          }}>
            Reset
          </button>
        </div>
      </div>
      <div className='freelancers-container'>
      
      {errorMessage && 
      <ErrorBar 
      errorMessage={errorMessage}
      errorType={errorType}
      removeError={removeError}
      />}
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
      <button 
      className='sort-toggle'
      onClick={() => setDisplay('sidenav','sort-toggle')}>
        SORT
      </button>
      {
        props.freelancers.map(freelancer => (
          <div 
          key={freelancer.attrs._id} 
          className='freelancer-card'>
            <img 
            src={freelancer.attrs.image ? freelancer.attrs.image : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`} 
            alt='headshot'/>
              <NavLink 
                className='name-link'
                key={uuid}
                to={`/freelancers/${freelancer.attrs.username}`}>
                {freelancer.attrs.name ? freelancer.attrs.name : freelancer.attrs.username}
              </NavLink>
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
          ))
      }
    </div>
  );
}

function setDisplay(classname, classname2) {
  const x = document.getElementsByClassName(classname)[0];
  const y = document.getElementsByClassName(classname2)[0];
  if (x.style.display === "none") {
    x.style.display = "block";
    y.style.backgroundColor = "#DE536B";
  } else {
    x.style.display = "none";
    y.style.backgroundColor = "rgb(38, 70, 222)";
  }
}