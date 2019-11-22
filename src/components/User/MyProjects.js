import React,{useState, useEffect} from 'react';
import ProjectSchema from '../../model/Project';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import uuid from  'uuid';
import { NavLink } from 'react-router-dom';

export default function MyProjects(props){
  const [option, setOption] = useState('created');
  const [projects, setProjects] = useState([]);
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;

  useEffect(() => {
    getAssignedProjects('created');
  }, [])

  async function getAssignedProjects(status){
    try {
      
      const condition = status === 'created' ? 
      {
        employer_username: person.username,
        sort: '-createdAt'
      } 
      : {
        selected_freelancer: person.username,
        sort: '-createdAt'
      };

      const Assigned = await ProjectSchema.fetchList(condition)
      setProjects(Assigned);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="my-projects-container">
      <h4>My Projects</h4>
      <div>
        <div className='switch-row'>
        <p 
        className='mp-switch'
        style={
          option === 'created' ?
          {borderBottom: '3px solid #00abb4'}
          :
          {borderBottom: 'none'}
        }
        onClick={() => {
          setOption('created')
          getAssignedProjects('created')
        }}>
          My Created Projects
        </p>
        <p 
        className='mp-switch'
        style={
          option === 'assigned' ?
          {borderBottom: '3px solid #00abb4'}
          :
          {borderBottom: 'none'}
        }
        onClick={() => {
          setOption('assigned')
          getAssignedProjects('assigned')
        }}>
          My Assigned Projects
        </p>
        </div>
        <AllProjects projects={projects}/>
      </div>
  </div>
  );
}

function AllProjects ({ projects }){
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
  <div className='my-projects-list'>
    {
      projects.map(project => (
        <div className='project-bar' key={uuid()}>
          <NavLink 
          key={'444444440001'}
          to={`/projects/${project.attrs.project_index}`}>
            {project.attrs.title}
          </NavLink>
          <p className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-project.attrs.createdAt))}</p>
        </div>
      ))
    }
  </div>);
}