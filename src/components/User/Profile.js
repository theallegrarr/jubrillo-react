import React from 'react';
import { Formik, Form, Field } from 'formik';
// import { MultiSelectComponent } from '@syncfusion/ej2-react-dropdowns';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/Star';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FaCommentAlt, FaUserEdit, FaBriefcase } from 'react-icons/fa';

// Summary, ratings, skills, rate, Role, Image, Name, Location
let person={};
export default function Profile(props) {
  const onLogin = ({ username, password }) => {
    return props.onLogin({ username, password });
  };
  if(props.userDetails.person)console.log(props.userDetails.person);
  if(props.userDetails.person){
    person=props.userDetails.person;
  }

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  const StyledRating = withStyles({
    iconFilled: {
      display: 'flex',
      color: '#FF3366',
      fontSize: '25pt',
      alignSelf: 'center',
    },
    iconHover: {
      color: '#ff3d47',
    },
  })(Rating);

  return (
    <div className='profile-form'>
    {!person._profile &&  (<CircularProgress className={classes.progress} />)}
    {person._profile && (
    <>
    <div className='profile-info'>
      <img src={person._profile.image["0"].contentUrl} alt='profile'/>
        <div className='profile-others'>
          <h2 className='name'>{person._profile.name}</h2>
          <h3 className='username'>{props.userDetails.username}</h3>
          <div className='ratings' ><p>Ratings:   <br/><StyledRating
            name="customized-color"
            value={5}
            // getLabelText={getLabelText}
            precision={0.5}
            icon={<StarBorderIcon fontSize="inherit" />}
            readOnly
          /></p></div>
          
        </div>
        <div className='buttons'>
          <button className='edit-button'>
            <FaUserEdit/>
            EDIT
          </button>
          <button className='hire-button'>
          <FaBriefcase />
          HIRE
          </button>
          <button className='msg-button'>
          <FaCommentAlt />
          MESSAGE
          </button>
        </div>
    </div>
    <Formik
      
      initialValues={{ username: '', password: '' }}
      onSubmit={onLogin}
      render={() => (
        <Form className='login'>
          <Field name='username' type="text" placeholder='username' />
          <Field name='password' type="text" placeholder='password' />
          <input type='submit' />
        </Form>
      )}
    />
    </>)}
    </div>
  );
}