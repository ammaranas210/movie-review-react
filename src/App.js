import { Fragment, useEffect, useState } from 'react';
import './App.css';
import SignIn from './SignIn';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import LandingPage from './LandingPage';

const USERS = "app__users";
const MOVIES = "app_movies";
const initialSnackbar = {
  open: false,
  severity: 'success',
  text: ''
}

function App() {
  useEffect(()=>{
    if(localStorage.getItem('current_user') !==null){
      setIsAuth(true);
    }
  },[]);
  const [isAuth, setIsAuth] = useState(false); // To Check whether user is authenticated or not.
  const [selectedMovie,setSelectedMovie] = useState(null);
  const [snackbar,setSnackbar] = useState(initialSnackbar);
  const [users,setUsers] = useState((localStorage.getItem(USERS) && JSON.parse(localStorage.getItem(USERS)))||{}); 
  const openSnackbar = (severity = '',text='')=>{
    setSnackbar({
      open:true,
      severity,
      text
    })
  }
  const handleSnackbarClose = ()=>{
    setSnackbar(initialSnackbar);
  }
  const onLogin = (values)=>{
    if(users[values.email]){ // Existing User
      if(users[values.email] !== values.password){
        openSnackbar('error','Login Fail ! Password Mismatch');
      }else{
        localStorage.setItem('current_user',values.email);
        openSnackbar('success','Welcome Back!');
        setIsAuth(true);
      }
    }else{ // User not exist, creates a user and then Login
      const newUsers = {
        ...users,
        [values.email]: values.password
      }
      openSnackbar('success','New User Created');
      localStorage.setItem(USERS,JSON.stringify(newUsers));
      setUsers(newUsers);
      localStorage.setItem('current_user',values.email);
      setIsAuth(true);
    }
  }
  const onLogOut = ()=>{
    setIsAuth(false);
    localStorage.removeItem('current_user');
  }
  const onSelectMovie = (id)=>{
    setSelectedMovie({
      id: id,
      data: localStorage.getItem(MOVIES+id)?JSON.parse(localStorage.getItem(MOVIES+id)):{}
    });
  }
  const onDeselectMovie = ()=>{
    setSelectedMovie(null);
  }
  const onRateAndComment = (noOfStars,comment)=>{
    const data = {
      ...selectedMovie.data,
      [localStorage.getItem('current_user')]:{star: noOfStars,comment: comment }
    }
    localStorage.setItem(MOVIES+selectedMovie.id,JSON.stringify(data));
    setSelectedMovie({...selectedMovie,data:data});
  }
  const onSaveReview = (userRating)=>{
    const data = {
        ...selectedMovie.data,
        [localStorage.getItem('current_user')]: userRating
    }

    setSelectedMovie({...selectedMovie,data:data});
    localStorage.setItem(MOVIES+selectedMovie.id,JSON.stringify(data));
    openSnackbar('success','Your review posted successfully');
    

  }
  return (
    <Fragment>
      {isAuth ? 
        <LandingPage 
          onLogOut={onLogOut} 
          username={localStorage.getItem('current_user')}
          selectedMovie = {selectedMovie}
          onRateAndComment = {onRateAndComment}
          onDeselectMovie = {onDeselectMovie}
          onSelectMovie = {onSelectMovie}
          onSaveReview = {onSaveReview}
        />
        : 
        <SignIn onLogin={onLogin} 
        />}
      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant={'filled'}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Fragment>  
  );
}

export default App;
