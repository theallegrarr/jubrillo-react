import React,{useState, useEffect} from 'react';
import ProjectSchema from '../../model/Project';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

export default function Transactions(props){
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
      const newArray = 
      Assigned.filter(assign => 
        parseFloat(assign.attrs.work_balance) > 0
      );
      
      setProjects(newArray);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="my-projects-container">
      <h4>My Transactions</h4>
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
          My Outgoing Transactions
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
          My Incoming Transactions
        </p>
        </div>
        {
          projects.length>0 &&
          <AllTransactions projects={projects}/>
        }
      </div>
  </div>
  );
}

function AllTransactions ({ projects }){
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
  <div className='my-projects-list'>
    {
      projects.map(project => (
        <div 
        className='project-bar' 
        key={project.attrs._id}>
          <a href={`/projects/${project.attrs.project_index}`}>
            {project.attrs.title}
          </a>
          <p className='time-ago'>Amount: BTC {project.attrs.work_balance}</p>
          <p className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-project.attrs.createdAt))}</p>
        </div>
      ))
    }
  </div>);
}