import React, {useEffect,useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import ProjectSchema from '../../model/Project';
import ReviewSchema from '../../model/Reviews';

export default function Review ({ 
  person, project,
  sentReview,
  receivedReview,
  setSent,
  setReceived
}) {
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateReviews();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [])

  async function updateReviews () {
    try {
      const jobReviews = await ReviewSchema.fetchList({
        project_id: project.project_id
      })

      if(jobReviews.length>0){
        if(jobReviews[0].attrs.to === person.username){
          setReceived(jobReviews[0]);
        }
      }
      if(jobReviews.length>1){
        if(jobReviews[1].attrs.to === person.username){
          setReceived(jobReviews[1]);
        }
      }
      if(jobReviews.length>0){
        if(jobReviews[0].attrs.from === person.username){
          setSent(jobReviews[0]);
        }
      }
      if(jobReviews.length>1){
        if(jobReviews[1].attrs.from === person.username){
          setSent(jobReviews[1]);
        }
      }

      //console.log(jobReviews.length, jobReviews, sentReview, receivedReview)
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <div>
      <p>Reviews</p>
      <div>
      {
        !sentReview.attrs ?
        <SendReview 
        person={person}
        project={project}/> :
        <ShowReview 
        review={sentReview}/>
      }
      </div>
      <div>
      {
        receivedReview.attrs &&
        <ShowReview 
        review={receivedReview}/>
      }
      </div>
    </div>
  );
}

function SendReview({ person, project }) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);

  async function submitReview(){
    try {
      const receiver = person.username === project.username 
      ? project.freelancer_username :
      project.username;

      const newReview = new ReviewSchema({
        rating: rating,
        project_id: project.project_id,
        text: message,
        from: person.username,
        to: receiver
      })

      const sending = await newReview.save();
      console.log(sending)
    } catch (error) {
      console.log(error)
    }
  }

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
    <div 
    className='apply'
    style={{
      'borderTop': 'none'
    }}>
    <p>Review Message: </p>
      <input 
      type='text' 
      className='completed-input'
      placeholder='Write a Review!'
      value={message}
      onChange={(e) => {
        setMessage(e.target.value);
      }}
      ></input>
      <StyledRating
        name="customized-color"
        value={rating}
        // getLabelText={getLabelText}
        precision={0.5}
        onChange={(event, newValue) => {
          setRating(newValue);
        }}
        icon={<StarBorderIcon 
          fontSize="large" />}
      />

      <button 
      className='sort-apply'
      style={{'marginLeft': '20px'}}
      onClick={() => submitReview()}>
        <span 
        role='img'
        description='lightning'
        aria-labelledby=''
        >📄{' '}</span>
          Submit Review!
      </button>
    </div>
  )
}

function ShowReview({
  review
}){
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

  return(
    <>
    {
      review &&
      <div>
      <p>{review.attrs.text}</p>
      <StyledRating2 
          value={review.attrs.rating} 
          readOnly 
          />
    </div>
  }</>)
}