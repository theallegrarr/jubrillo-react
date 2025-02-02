import React, { useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import ForumSchema from '../../model/Forum';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import uuid from 'uuid';
import { NavLink } from 'react-router-dom';
import SEO from 'react-seo-component';
import navimage from '../../assets/logo.png';
import { Helmet } from 'react-helmet';
//import ReplySchema from '../../model/ForumReplies';

export default function Forum(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, [])

  async function getPosts(){
    try {
      const fetchPosts = await ForumSchema.fetchList({
        limit: 20,
        sort: '-createdAt'
      })
      setPosts(fetchPosts)
      //console.log(fetchPosts)
    } catch (error) {
      console.log(error)
    }
  }

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
      marginTop: '20%',
      marginLeft: '50%',
    },
  }));
  const classes = useStyles();

  return(
    <div className='forum-container'>
      <SEO
        title={'Jubrillo'}
        description={'Forum'}
        image={navimage}
        pathname={'jubrillo.work/forum'}
        siteLanguage={'en'}
        siteLocale={'en_gb'}
        twitterUsername={'jubrillowork'}
      />
      <Helmet>
        <title>{'Forum'}</title>
      </Helmet>
      <h4>Forum</h4>
      <div className='add-post-container'>
        
        <button 
        className='edit-button'
        onClick={() => props.history.push('/forum/new')}
        ><span 
        role='img'
        description='lightning'
        aria-labelledby=''>➕{' '}</span>
          New Post
        </button>
      </div>
      

      {
        posts.length > 0 ?
        <Posts key='0000234' posts={posts} />
        :
        <CircularProgress className={classes.progress} />
      }
    </div>
  );
}

function Posts ({ posts }) {
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  timeAgo.format(new Date());

  return(<>
    {
      posts.map(post => (
      <div 
      key={post.attrs._id}
      className='forum-topic'>
        <div className='line-1'>
          <NavLink
          key={uuid}
          to={`/forum/${post.attrs.forum_index}/view`}
          >{post.attrs.topic}</NavLink>
          <p className='time-ago'>created {timeAgo.format(Date.now() - (Date.now()-post.attrs.createdAt))}</p>
        </div>
        <p>Author: 
          <NavLink 
          key={uuid}
          to={`/freelancers/${post.attrs.author}`}>
            {post.attrs.author}
          </NavLink>
        </p>
      </div>
      ))
    }
  </>)
}