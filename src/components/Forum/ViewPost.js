import React, { useState, useEffect } from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { FaCommentAlt, FaBriefcase } from 'react-icons/fa';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ForumSchema from '../../model/Forum';
import RepliesSchema from '../../model/ForumReplies';

export default function ProjectPage(props) {
  const [post, setPost] = useState({});
  const [reply, setReply] = useState('');

  useEffect(() => {
    getPost();
  }, [])

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '15%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  async function getPost(){
    //console.log(props.match)
    try {
      const post = await ForumSchema.fetchList({
        forum_index: props.match.params.post_index
      })
      setPost(post[0].attrs);
      console.log(post);
    } catch(error) {
      console.log(error)
    }
  }

  return(
    <div 
    key='0000367363'
    className='view-post-container'>
      {
        post.topic ? 
          <Post post={post} />
          :
          <CircularProgress className={classes.progress} />
      }
      <div>
        <ClassicEditorFunction 
        reply={reply} 
        setReply={setReply} />
        <button 
        className='reply-button'
        >Add Reply</button>
      </div>
    </div>
  )
}

function Post({ post }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(
    <>
    <div className='post-head'>
      <h4>Post Topic: {post.topic}</h4>
      <div className='author-info'>
        <p>Author: <a href={`/freelancers/${post.author}`}>
          {post.author}
        </a></p>
        <p className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-post.createdAt))}</p>
      </div>
    </div>
    <div className='post-body'>
      <MyComponent html={post.body}/>
    </div>
    </>
  );
}

function createMarkup(html) {
  return {__html: html};
}

function MyComponent({html}) {
  return <div dangerouslySetInnerHTML={createMarkup(html)} />;
}

function ClassicEditorFunction(props){

  return(
    <div className="App">
      <CKEditor
          editor={ ClassicEditor }
          data={props.reply}
          onInit={ editor => {
              // You can store the "editor" and use when it is needed.
              //console.log( 'Editor is ready to use!', editor );
          } }
          onChange={ ( event, editor ) => {
              const data = editor.getData();
              // console.log( { event, editor, data } );
              props.setReply(data);
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
