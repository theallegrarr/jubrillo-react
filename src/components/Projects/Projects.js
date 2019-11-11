import React, { useState, useEffect } from 'react';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import ProjectSchema from '../../model/Project';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import * as data from '../User/skillsData.json';

const fields = { text: 'Name', value: 'Code' };

export default function Project(props) {
  
  const [rateSort, setRate] = useState(0);
  const [skills, setSkills] = useState([]);
  const [completedJobs, setCompleted] = useState();
  const [projects, setProject] = useState([]);

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
      limit: 10,
      offset: 0
    }).then(res => {
      console.log(res)
      setProject(res);
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
            onchange={(e) => setSkills(e.value)}
            />
          </div>
        </div>
        <p>Min. Budget: </p>
        <input 
        type='text' 
        className='completed-input'
        placeholder='Enter a number'
        value={completedJobs}
        onChange={(e) => {
          setCompleted(e.target.value);
        }}
        ></input>
        <p>Min. Employer Rating: </p>
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
      <div key='314' className='freelancers-container'>
      <div className='add-button-container'>
        
          <button 
          className='add-project-button'
          onClick={() => props.history.push('/newproject')}
          >
            + Create Project
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
    <div key="313" className='projects-list'>
      
      {
        props.projects.map(project => (
          <ProjectCard project={project} />
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
      <a href={`/projects/${project.attrs.project_index}`}>
        <span 
          role='img'
          description='lightning'
          aria-labelledby=''>💼{' '}</span>{project.attrs.title}
          </a>
          
      <h4 className='budget-amount'>budget: ${project.attrs.budget}</h4>
      <p className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-project.attrs.createdAt))}</p>
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