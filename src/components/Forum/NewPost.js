import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ForumSchema from '../../model/Forum';

export default function NewProjectForm(props) {
  const [topic, setTopic] = useState('');
  const [body, setBody] = useState('');
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;

  async function createPost () {
    try {
      const allPosts = await ForumSchema.fetchList();
      const nextIndex = allPosts.length+1;

      const newPost = new ForumSchema({
        topic: topic,
        body: body,
        author: person.username,
        forum_index: nextIndex
      })

      await newPost.save();
      props.history.push('/forum');

    } catch (error) {
      console.log(error);
    }
  }

  return(
  <div className='form-container'>
    <h2>Create a New Post</h2>
    <PostForm 
      topic={topic}
      setTopic={setTopic}
      body={body}
      setBody={setBody}
      otherProps={props}
      createPost={createPost}
    />
  </div>);
}

//const fields = { text: 'Name', value: 'Code' };
function PostForm({
  topic,
  setTopic,
  body,
  setBody,
  otherProps,
  createPost
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
          name='topic' 
          type="text" 
          placeholder='Enter a Post Title....' 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}/>

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
            setDescription={setBody} 
            description={body} />
          </div>
          <div className='buttons'>
            <button className='submit' onClick={(e) => {
              createPost()
            }}>CREATE POST</button>
            <button className='cancel' onClick={() => {
              otherProps.history.push('/forum');
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
