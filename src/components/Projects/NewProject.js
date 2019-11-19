import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import NewProject from '../../model/newProject';
import Projects from '../../model/Project';
import Profile from '../../model/Profile';
import * as data from '../User/skillsData.json';
import ErrorBar from '../errorBar/errorBar';

export default function NewProjectForm(props) {
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState();
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState([]);
  const [duration, setDuration] = useState();
  const [rating, setRating] = useState(0);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState('bad');
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;

  useEffect(() => {
    Profile.fetchList({ username: person.username })
      .then(res => {
        setRating(res[0].attrs.rating);
      }).catch(err => console.log(err));
  }, [])

  const createProject = () => {
    setErrorType('good');
    removeError('Creating new Project...')
    Projects.fetchList().then(res => {
      const data = {
        title: title,
        employer_username: person.username,
        project_index: res.length,
        budget: budget,
        description: description,
        skills: skills,
        employer_rating: rating,
        duration: duration
      }
      if(data.title && data.budget && data.description && data.skills && data.duration){
        NewProject(data)
          .then(res => {
            setErrorType('good');
            removeError('Project created successfully...')
            updateUserProjects(data.project_index);
          }).catch(err => console.log(err));
      } else {
        setErrorType('bad');
        removeError('Complete all fields before submitting...')
      }
    }).catch(err => console.log(err));
  }

  async function updateUserProjects(index){
    setErrorType('good');
    removeError(`You'll be redirected in a few...`)
    try {
      const userInfo = await Profile.fetchList({ username: person.username })
      userInfo[0].update({ jobsCreated: userInfo[0].attrs.jobsCreated+1 })
      await userInfo[0].save();
      props.history.push(`/projects/${index}`)
    } catch(error) {
      console.log(error)
    }
  } 

  return(
  <div className='form-container'>
    {errorMessage && 
     <ErrorBar 
     errorMessage={errorMessage}
     errorType={errorType}
     removeError={removeError}
     />}
    <h2>Create a New Project</h2>
    <ProjectForm 
      title={title}
      setTitle={setTitle}
      budget={budget}
      setBudget={setBudget}
      description={description}
      setDescription={setDescription}
      skills={skills}
      setSkills={setSkills}
      duration={duration}
      setDuration={setDuration}
      createProject={createProject}
      history={props.history}
    />
  </div>);
}

const fields = { text: 'Name', value: 'Code' };
function ProjectForm({
  title,
  setTitle,
  budget,
  setBudget,
  skills,
  setSkills,
  duration,
  setDuration,
  description,
  setDescription,
  createProject,
  history
}){
  //const [picked, setPicks] = useState({});
  
  return (
    <Formik 
      initialValues={{ email: '', summary: '' }}
      //onSubmit={}
      render={() => (
        <Form className='edit-profile'>
          <Field 
          className='profile-input' 
          name='title' 
          type="text" 
          placeholder='Enter a Project Title....' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        
          <Field 
          className='profile-input' 
          name='budget' 
          type="text" 
          placeholder='Enter Your Budget in $ (Minimum of $30)....' 
          value={budget}
          onChange={(e) => setBudget(e.target.value)}/>

          <Field 
          className='profile-input' 
          name='budget' 
          type="text" 
          placeholder='Enter Your Target Duration in Days....' 
          value={duration}
          onChange={(e) => setDuration(e.target.value)}/>

          <div className='control-pane'>
          <div className='control-section'>
              <div id='multidefault' className="control-styles">
                <MultiSelectComponent 
                id="customelement" 
                dataSource={data.skills} 
                fields={fields} mode="Box"
                value={skills}
                placeholder="Required Skills" 
                change={(e) => setSkills(e.value)}
                />
              </div>
          </div>
          
        </div>

          {/* <div className='multiselect'>
            <Multiselect
              data={skillsData}
              defaultValue={''}
              textField='name'
              caseSensitive={false}
              minLength={3}
              filter='contains'
              onChange={(e) => setPicks(e)}
            />
          </div> */}
          
          <div>
            <ClassicEditorFunction 
            setDescription={setDescription} 
            description={description} />
          </div>
          <div className='buttons'>
            <button className='submit' onClick={(e) => createProject()}>CREATE PROJECT</button>
            <button className='cancel' onClick={() => {
              history.push('/projects');
            }}>CANCEL</button>
          </div>
        </Form>
      )}
    />
  );
}


function ClassicEditorFunction(props){

  return(
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data={props.description}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              // console.log( { event, editor, data } );
              props.setDescription(data);
          } }
          onBlur={ ( event, editor ) => {
              //console.log( 'Blur.', editor );
          } }
          onFocus={ ( event, editor ) => {
              //console.log( 'Focus.', editor );
          } }
      />
  </div>
  );
}
