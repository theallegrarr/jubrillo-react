import React, {useEffect,useState} from 'react';
import Projects from '../../model/Project';
import ApplicationSchema from '../../model/Applications';

export default function ProjectThread (props) {
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;
  const [project, setProject] = useState([]);
  const [applicant, setApplicant] = useState([]);

  useEffect(() => {
    Projects.fetchList({
      "project_index": props.match.params.project_index
    }).then(res => {
      if(res.length>0){

        const project={
          title: res[0].attrs.title,
          description: res[0].attrs.description,
          employer_rating: res[0].attrs.employer_rating,
          step: res[0].attrs.step,
          active: res[0].attrs.active,
          skills: res[0].attrs.skills,
          username: res[0].attrs.employer_username,
          project: res[0].attrs.budget,
          project_id: res[0].attrs._id
        }
        // console.log(project)
        setProject(project);

        ApplicationSchema.fetchList({ "selected": true, "project_id": project.project_id}).then(res => {
          console.log(res)
          setApplicant(res[0].attrs);
          if(person.username !== project.username &&
            res[0].attrs.applicant_username !== person.username){
            props.history.push(`/projects/${props.match.params.project_index}`)
          }
        }).catch(err => console.log(err))
      }
    }).catch(err => console.log(err))
  }, [])

  return(
    <>
    </>
  );
}