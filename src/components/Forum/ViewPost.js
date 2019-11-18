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
import ErrorBar from '../errorBar/errorBar';

export default function ProjectPage(props) {
  const [post, setPost] = useState({});
  const [reply, setReply] = useState('');
  const [replies, setReplies] = useState([]);
  const [errorMessage, removeError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [showComments, setShowComments] = useState(false);
  const localData=JSON.parse(localStorage.getItem('blockstack-session'));
  const person=localData.userData;

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
      // console.log(post);

      const allReplies = await RepliesSchema.fetchList({
        forum_post_id: post[0].attrs._id,
        sort: '-createdAt'
      })
      console.log(allReplies)
      setReplies(allReplies);
    } catch(error) {
      console.log(error)
    }
  }

  async function sendComment(){
    setErrorType(`good`)
    removeError(`Updating Comments, Please Wait.....`);
    
    try {
      if(reply){
        const newReply = new RepliesSchema({
          body: reply,
          author: person.username,
          forum_post_id: post._id
        })

        await newReply.save();
        await getPost();
        setErrorType(`good`)
        removeError(`Comment Added`);
        setReply('')
      } else {
        setErrorType(`bad`)
        removeError(`Type a Comment...`);
      }
    } catch (error) {
      console.log(error)
      setErrorType(`bad`)
      removeError(`Update Failed, Please Try Again...`);
    }
  }

  return(
    <div 
    key='0000367363'
    className='view-post-container'>
      {errorMessage && 
      <ErrorBar 
      errorMessage={errorMessage}
      errorType={errorType}
      removeError={removeError}
      />}
      {
        post.topic ? 
          <Post post={post} />
          :
          <CircularProgress className={classes.progress} />
      }
      <div className='replies-area'>
        <Replies 
        replies={replies}
        showComments={showComments}
        setShowComments={setShowComments}/>
      </div>
      <div>
        <ClassicEditorFunction 
        reply={reply} 
        setReply={setReply} />
        <button 
        className='reply-button'
        onClick={() => {
          sendComment()
        }}
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
        <p 
        className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-post.createdAt))}</p>
      </div>
    </div>
    <div className='post-body'>
      <MyComponent html={post.body}/>
    </div>
    </>
  );
}

function Replies({ 
  replies,
  showComments,
  setShowComments 
}) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(<>
    <h4
      className='replies-head'
      onClick={() => setShowComments(!showComments)}
    >Replies ({replies.length})</h4>
    {
      replies.length>0 && showComments &&
      replies.map(reply => (
        <div 
        key={reply.attrs._id}
        className='reply-card'>
          <div className='author-info'>
            <p>from: {reply.attrs.author}</p>
            <p className='time-ago'>sent {timeAgo.format(Date.now() - (Date.now()-reply.attrs.createdAt))}</p>
          </div>
          <MyComponent html={reply.attrs.body}/>
        </div>
      ))
    }
  </>)
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

