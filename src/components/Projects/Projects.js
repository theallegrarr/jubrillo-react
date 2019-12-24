import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import ProjectSchema from '../../model/Project';
import Rating from '@material-ui/lab/Rating';
//import StarBorderIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as data from '../User/skillsData.json';
import ErrorBar from '../errorBar/StatusBar';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';
import SEO from 'react-seo-component';
import navimage from '../../assets/logo.png';
import { Helmet } from 'react-helmet';
import { FaAlignJustify } from 'react-icons/fa';

const fields = { text: 'Name', value: 'Code' };

export default function Project(props) {
  
  const [skills, setSkills] = useState([]);
  const [budget, setBudget] = useState(0);
  const [projects, setProject] = useState([]);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState(''); 

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '20%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    ProjectSchema.fetchList({
      sort: '-createdAt',
      limit: 20,
      offset: 0,
      step: { $lt: 3 }
    }).then(res => {
      //console.log(res)
      setProject(res);
    }).catch(err => console.log('error: ',err))

  }, [])

  function sortSelectedProjects(list,skills){
    let newList=[];
    for(let i=0; i<list.length; i++){
      //console.log(list[i])
      if(list[i].attrs.skills){
        if(checker(skills, list[i].attrs.skills) && parseInt(list[i].attrs.budget)>budget){
          //console.log(list[i])
          newList.push(list[i])
        }
      }
    };
    return newList;
  }

  const checker = (arr, target) => {
    for(let j=0; j<skills.length; j++){
      if(target.indexOf(skills[j])<0)return false;
    }
    return true;
  };

  async function sortProjects(){
    setErrorType('loading')
    removeError('Refining the Projects List')
    try {
      
      let sortedList = await ProjectSchema.fetchList({
        sort: '-createdAt',
        step: { $lt: 3 }
      })
      sortedList = await sortSelectedProjects(sortedList,skills)
      
      
      if(sortedList.length >0){
        setProject(sortedList)
        setErrorType('good')
        removeError('List Updated')
      } else {
        setErrorType('bad')
        removeError('No Projects Matching Your Selection')
      }
    } catch(error) {
      //console.log(error.message)
      setErrorType('bad')
      removeError('Sort Failed')
    }
  }

  async function resetList(){
    setErrorType('loading')
    removeError('Fetching default list')
    ProjectSchema.fetchList({
      sort: '-createdAt',
      limit: 20,
      offset: 0,
      step: { $lt: 3 }
    }).then(res => {
      //console.log(res)
      setProject(res);
      setErrorType('good')
      removeError('List updated')
    }).catch(err => console.log(err))
  }

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
        <title>{`Jubrillo - All Open Projects`}</title>
      </Helmet>
      <div className="sidenav">
        <p>Required Skills: </p>
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
        <p className='p-min-rating'>Min. Budget: </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Enter a number'
        value={budget>0 ? budget : ''}
        onChange={(e) => {
          setBudget(e.target.value);
        }}
        ></input>
        {/* <p>Min. Employer Rating: </p>
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
            /> */}
        <div className='sort-actions'>
          <button 
          className='sort-apply'
          onClick={() => sortProjects()}>Apply</button>
          <button 
          className='sort-apply reset'
          onClick={() => {
            resetList()
          }}>
            Reset
          </button>
        </div>
      </div>
      <div key='314' className='freelancers-container'>
      
      {errorMessage && 
      <ErrorBar 
      errorMessage={errorMessage}
      errorType={errorType}
      removeError={removeError}
      />}
      <div className='add-button-container'>
        <button 
        className='sort-toggle2'
        onClick={() => setDisplay('sidenav','sort-toggle2')}>
          SORT
        </button>
          <button 
          className='add-project-button'
          onClick={() => props.history.push('/newproject')}
          ><span 
          role='img'
          description='lightning'
          aria-labelledby=''>➕{' '}</span>
            New Project
          </button>
        
      </div>
         {
          projects.length > 0 ? 
          (<ProjectsList projects={projects} key='321' />)
          //(<CircularProgress className={classes.progress} />)
          :
          (<CircularProgress className={classes.progress} />)
        }
      </div>
    </>
  )
}

//const fields = { text: 'Name', value: 'Code' };
const ProjectsList = (props) => {
   
  return (
    <div key="524252425" className='projects-list'>
      
      {
        props.projects.map(project => (
          <ProjectCard project={project} key={project.attrs._id}/>
          ))
      }
    </div>
  );
}

function ProjectCard({ project }){
  function createMarkup() {
    return {__html: project.attrs.description};
  }
  
  function MyComponent() {
    return <div dangerouslySetInnerHTML={createMarkup()} />;
  }

  const StyledRating2 = withStyles({
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

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
    <div 
    key={project.attrs._id} 
    className='project-card'>
      <div className='job-heading'>
        <NavLink 
        to={`/projects/${project.attrs.project_index}`}
        key={uuid}>
          <span 
            role='img'
            description='lightning'
            aria-labelledby=''>💼{' '}</span>{project.attrs.title}
        </NavLink>

      <h4 className='budget-amount'>budget: ${project.attrs.budget}</h4>
      <p 
      style={{
        'fontSize': '8pt',
        'fontWeight': '700'
      }}
      className='time-ago'
      >created {timeAgo.format(Date.now() - (Date.now()-project.attrs.createdAt))}</p>
      </div>
      <div className='rating-row'>
        {/* <p>Employer Rating: <br/></p> */}
        <StyledRating2 
        value={project.attrs.employer_rating} 
        readOnly 
        />
      </div>
      <span className='text-span'><MyComponent /></span>
      <div className='control-pane'>
        <div className='control-section'>
            <div id='multidefault' className="control-styles">
              <MultiSelectComponent 
              id="customelement" 
              dataSource={data.skills} 
              fields={fields} mode="Box"
              value={project.attrs.skills}
              placeholder="Required Skills" 
              readonly={true}
              />
            </div>
        </div>
      </div>
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
    y.style.backgroundColor = "#00ABB4";
  }
}